import { ref } from 'vue';
import MdBottomSheet from '../../../src/components/bottom-sheet/MdBottomSheet.vue';
import MdFilledButton from '../../../src/components/button/MdFilledButton.vue';
import MdTextButton from '../../../src/components/button/MdTextButton.vue';
import MdList from '../../../src/components/list/MdList.vue';
import MdListItem from '../../../src/components/list/MdListItem.vue';
import coast from '../../assets/coast.svg';

export default { title: 'Components/Bottom Sheet', component: MdBottomSheet, parameters: { layout: 'padded' } };
const render = (modal) => () => ({
  components: { MdBottomSheet, MdFilledButton, MdTextButton, MdList, MdListItem },
  setup() {
    return { open: ref(!modal), saved: ref(false), modal, coast };
  },
  template: `<section style="min-height: 520px; max-width: 960px; margin: 32px auto; font-family: Roboto, sans-serif; color: var(--md-sys-color-on-surface)">
    <p style="margin: 0 0 8px; font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase">Your next escape</p>
    <h2 style="font-size: 32px; line-height: 40px; font-weight: 400; margin: 0 0 16px">A place worth slowing down for</h2>
    <p style="max-width: 480px; line-height: 24px; margin-bottom: 24px">Explore a sheltered bay, save it to your places, and plan a quieter weekend.</p>
    <MdFilledButton type="button" label="Explore the coast" @click="open = true" />
    <p v-if="saved" role="status">Coastal escape saved to your places.</p>
    <MdBottomSheet v-model="open" :modal="modal" headline="Coastal escape">
      <img :src="coast" alt="Illustrated turquoise bay surrounded by green cliffs" style="display: block; width: 100%; height: 180px; object-fit: cover; border-radius: 16px; margin-bottom: 20px" />
      <p style="font-size: 16px; line-height: 24px; margin: 0 0 16px">Clear water, a sheltered walking trail, and a little more space to breathe.</p>
      <MdList aria-label="Place information" style="background: transparent; max-height: none">
        <MdListItem icon="location_on" headline="A little off the beaten path" supporting-text="12 km from the city center" />
        <MdListItem icon="schedule" headline="Make a day of it" supporting-text="Open daily, sunrise to sunset" />
        <MdListItem icon="hiking" headline="Follow the coastal trail" supporting-text="An easy 45-minute walk with sea views" />
      </MdList>
      <template #footer="{ close }">
        <MdTextButton type="button" label="Not now" @click="close('cancel')" />
        <MdFilledButton type="button" label="Save place" @click="saved = true; close('save')" />
      </template>
    </MdBottomSheet>
  </section>`,
});
export const Modal = render(true);
export const Standard = render(false);
