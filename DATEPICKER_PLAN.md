# Datepicker Uygulama Planı, M3 Görselleri Ana Referans

## Ozet
Vuetify sadece davranissal referans olacak:
- state/view ayrimi
- day/month/year navigation
- allowed-date mantiginin day, month, year ve nav seviyesine tasinmasi
- reverse transition ve keyboard kaliplari

Kaynak tasarim standardi ise Material 3 gorselleri:
- `docked`
- `modal`
- `modal input`

Bu nedenle Vuetify'den M2 gorsel yapisi alinmayacak. Header hiyerarsisi, controls yerlestirimi, typography, selected/today gorunumu, divider kullanimi ve input-first modal duzeni M3 gorsellerine gore uygulanacak.

Bu implementasyon fazi sadece `single-date`. `range`, ayni core oturduktan sonra ikinci faz olacak.

## Public API
- `MdDatePicker`
  - Saf picker surface
  - `variant: 'docked' | 'modal'`
  - `entryMode?: 'calendar' | 'input'`
  - `modelValue: string | null`
  - `open?: boolean`
  - `locale?: string`
  - `displayFormat?: string`
  - `min?: string`
  - `max?: string`
  - `isDateDisabled?: (isoDate: string) => boolean`
  - emit: `update:modelValue`, `update:open`, `confirm`, `cancel`, `month-change`, `year-change`, `view-change`
- `MdDatePickerField`
  - Field-backed M3 kullanim yuzeyi
  - `pickerVariant: 'docked' | 'modal' | 'modal-input'`
  - ayni tarih props'lari + `label`, `supportingText`, `error`, `errorText`, `fieldVariant: 'outlined' | 'filled'`
  - `invalid-input` emit eder

Karar:
- `MdDatePicker` trigger field icermez
- `MdDatePickerField` docked ve modal-input deneyimini saglar
- Storybook'ta ana kullanim olarak `MdDatePickerField` gosterilir; `MdDatePicker` daha dusuk seviye surface olarak da dokumante edilir

## Entegrasyon Asamalari
### 1. Core state ve broken secim akisi
- Tek kaynakli picker state kurulacak:
  - `committedValue`
  - `draftValue`
  - `displayedMonth`
  - `displayedYear`
  - `viewMode: 'day' | 'months' | 'years' | 'input'`
  - `focusedDate`
  - `isReversing`
- Child-local `pickerDate` kaldirilacak
- `Cancel` sadece draft'i geri alacak
- `OK` sadece modal varyantta commit edecek
- `docked` secimde aninda emit edecek
- `window.dayjs` kaldirilacak

### 2. Day view, M3 calendar gorunumu
- Takvim grid'i leading/trailing gunlerle tam ay gorunumu verecek
- Gorsel state'ler:
  - `today`: outlined
  - `selected`: filled
  - `disabled`: non-interactive + muted
  - `out-of-month`: muted + non-selectable
- Gecmis, bugun ve gelecek tarihleri ayni takvim icinde dogal bicimde gosterecek
- Weekday sirasi locale tabanli uretilecek
- `min`, `max`, `isDateDisabled` bu asamada aktif olacak

### 3. M3 docked varyant
- Docked deneyim `MdDatePickerField` uzerinden sunulacak
- Yerlestim:
  - ustte dis field
  - altta anchored picker panel
  - panel icinde split controls:
    - sol: month dropdown + prev/next
    - sag: year dropdown + prev/next
- Action row yok
- Headline yok
- Secim aninda commit

### 4. M3 modal varyant
- `MdDatePicker` + `MdDialog` ile modal shell
- Yerlestim:
  - ustte supporting text `Select date`
  - buyuk headline secili tarih
  - sagda input/calendar toggle ikonu
  - divider
  - icerikte combined month-year control + prev/next arrows
  - day grid
  - altta `Cancel / OK`
- `modal` token seti kullanilacak

### 5. M3 modal input varyanti
- `MdDatePickerField` icinde acilan modal `entryMode='input'` ile baslayacak
- Yerlestim:
  - header supporting text + headline
  - icon ile calendar/input mod degisimi
  - divider
  - body'de internal text field
  - footer `Cancel / OK`
- Parse basariliysa draft guncellenecek
- Parse basarisizsa hata gosterilecek, model degismeyecek

### 6. Month ve year views
- Day body alani icinde `months` ve `years` gorunumleri acilacak
- Docked varyantta scrollable secim gorunumu olacak
- Modal varyantta header korunup body degisecek
- `isMonthAllowed` ve `isYearAllowed` hesaplari eklenecek

### 7. Transition ve motion hardening
- Month paging:
  - horizontal slide + fade
  - `300ms`
  - reverse yonu `isReversing` ile belirlenir
- `day <-> months <-> years <-> input`:
  - `fade-grow`
  - `250ms`
  - body-only transition
- Modal content:
  - dialog fade korunur
  - picker icerigi hafif scale/fade ile girer

### 8. A11y ve keyboard
- `role="grid"`, `row`, `gridcell`
- roving tabindex
- keyboard:
  - oklar gun
  - `Home/End` hafta basi/sonu
  - `PageUp/PageDown` ay
  - `Shift + PageUp/PageDown` yil
  - `Enter/Space` secim
  - `Escape` subview veya modal kapatma

## Test Plan
- Asama bazli:
  - `npm test -- tests/unit/components/datepicker/MdDatePicker.spec.js`
- Faz sonu:
  - `npm test`
  - `npm run build-storybook`

Storybook:
- `DatePicker/Field Docked`
- `DatePicker/Modal`
- `DatePicker/Field Modal Input`
- `DatePicker/Disabled Dates`
- `DatePicker/Locale TR`
- `DatePicker/Dark`

## Varsayimlar
- Bu faz `single-date` ile sinirli
- Dis model her zaman `YYYY-MM-DD | null`
- Vuetify logic referansi kullanilacak, gorsel referans olarak kullanilmayacak
- M3 gorselleri source of truth
- Mobil fullscreen range davranisi ve `range` secimi sonraki faz
