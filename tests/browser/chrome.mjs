import { spawn } from 'node:child_process';
import { mkdtemp, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Disposable browser only. No connection to the user's browser or profile.
export async function launchChrome() {
  const candidates = [process.env.CHROME_BIN, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean);
  let executable;
  for (const candidate of candidates) {
    try {
      await access(candidate);
      executable = candidate;
      break;
    } catch {
      /* Try next installed browser. */
    }
  }
  if (!executable) throw new Error('Chrome not found. Set CHROME_BIN to an installed Chrome/Chromium executable. No browser is downloaded.');
  const profile = await mkdtemp(path.join(tmpdir(), 'vm3-browser-'));
  const child = spawn(executable, [
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-dev-shm-usage',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    'about:blank',
  ]);
  let socket;
  const pending = new Map();
  let id = 0;
  const errors = [];
  const close = async () => {
    socket?.close();
    for (const request of pending.values()) request.reject(new Error('Browser closed'));
    pending.clear();
    if (child.exitCode === null) {
      child.kill();
      await Promise.race([new Promise((resolve) => child.once('exit', resolve)), new Promise((resolve) => setTimeout(resolve, 2000))]);
      if (child.exitCode === null) child.kill('SIGKILL');
    }
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  };
  try {
    const endpoint = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Chrome startup timed out')), 15000);
      let stderr = '';
      child.stderr.on('data', (chunk) => {
        stderr += chunk;
        const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) {
          clearTimeout(timeout);
          resolve(match[1]);
        }
      });
      child.once('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
      child.once('exit', (code) => {
        clearTimeout(timeout);
        reject(new Error(`Chrome exited: ${code}\n${stderr}`));
      });
    });
    socket = new WebSocket(endpoint);
    await new Promise((resolve, reject) => {
      socket.onopen = resolve;
      socket.onerror = reject;
    });
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
    };
    const send = (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const requestId = ++id;
        const timeout = setTimeout(() => {
          pending.delete(requestId);
          reject(new Error(`CDP timeout: ${method}`));
        }, 15000);
        pending.set(requestId, {
          resolve: (result) => {
            clearTimeout(timeout);
            resolve(result);
          },
          reject: (error) => {
            clearTimeout(timeout);
            reject(error);
          },
        });
        socket.send(JSON.stringify({ id: requestId, method, params, sessionId }));
      });
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const command = (method, params) => send(method, params, sessionId);
    await command('Page.enable');
    await command('Runtime.enable');
    const evaluate = async (expression) => {
      const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      return result.result.value;
    };
    const waitFor = async (expression) => {
      const end = Date.now() + 45000;
      while (Date.now() < end) {
        if (await evaluate(expression)) return;
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      throw new Error(`Browser condition timed out: ${expression}\n${errors.join('\n')}\n${await evaluate('document.body.innerText')}`);
    };
    const click = async (selector) => {
      const point = await evaluate(
        `(() => { const el = document.querySelector(${JSON.stringify(
          selector
        )}); if (!el) throw new Error('Missing target'); el.scrollIntoView({block:'center'}); const r=el.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`
      );
      await command('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
      await command('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 });
    };
    const key = async (key, code = key, modifiers = 0) => {
      await command('Input.dispatchKeyEvent', {
        type: 'keyDown',
        key,
        code: key === ' ' ? 'Space' : code,
        modifiers,
        ...(key === 'Enter' ? { text: '\r', unmodifiedText: '\r' } : key.length === 1 ? { text: key } : {}),
        windowsVirtualKeyCode: { Tab: 9, Enter: 13, Escape: 27, ' ': 32, ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, Home: 36, End: 35 }[key],
      });
      await command('Input.dispatchKeyEvent', {
        type: 'keyUp',
        key,
        code: key === ' ' ? 'Space' : code,
        modifiers,
        windowsVirtualKeyCode: { Tab: 9, Enter: 13, Escape: 27, ' ': 32, ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, Home: 36, End: 35 }[key],
      });
    };
    return { command, evaluate, waitFor, click, key, close, version: await send('Browser.getVersion') };
  } catch (error) {
    await close();
    throw error;
  }
}
