import { ref } from 'vue';
import MdFilledButton from '../../../src/components/button/MdFilledButton.vue';
import MdTextButton from '../../../src/components/button/MdTextButton.vue';
import MdCheckbox from '../../../src/components/checkbox/MdCheckbox.vue';
import MdSideSheet from '../../../src/components/side-sheet/MdSideSheet.vue';

export default { title: 'Components/Side Sheet', component: MdSideSheet };
const render =
  (modal, dir = 'ltr', edge = 'end') =>
  () => ({
    components: { MdSideSheet, MdFilledButton, MdTextButton, MdCheckbox },
    setup() {
      return { open: ref(!modal), modal, dir, edge };
    },
    template: `
    <div :dir="dir" style="display: flex; min-height: 360px; gap: 24px;">
      <main style="flex: 1; min-width: 0;"><MdFilledButton type="button" label="Open filters" @click="open = true" /><p>Primary content remains usable with a standard sheet.</p></main>
      <MdSideSheet v-model="open" :modal="modal" :edge="edge" headline="Filters" :dir="dir">
        <label style="display: flex; align-items: center; gap: 12px"><MdCheckbox /> Available now</label>
        <p v-for="index in 12" :key="index">Filter {{ index }}</p>
        <template #footer="{ close }"><MdTextButton type="button" label="Cancel" @click="close('cancel')" /><MdFilledButton type="button" label="Apply filters" @click="close('apply')" /></template>
      </MdSideSheet>
    </div>`,
  });
export const Standard = render(false);
export const Modal = render(true);
export const RightToLeft = render(true, 'rtl');
export const StartEdge = render(true, 'ltr', 'start');
