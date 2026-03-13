import { ref } from 'vue';
import MdTabs from '../../../src/components/tabs/MdTabs.vue';
import MdPrimaryTab from '../../../src/components/tabs/MdPrimaryTab.vue';
import MdSecondaryTab from '../../../src/components/tabs/MdSecondaryTab.vue';

export default {
  title: 'Components/Tabs',
  component: MdTabs,
  args: {
    modelValue: 0,
    activationMode: 'auto',
  },
};

const PrimaryTemplate = (args) => ({
  components: { MdTabs, MdPrimaryTab },
  setup() {
    const activeIndex = ref(args.modelValue);
    return { args, activeIndex };
  },
  template: `<div>
    <MdTabs v-model="activeIndex" :activation-mode="args.activationMode" aria-label="Primary tabs">
      <MdPrimaryTab label="Flights" panel-id="primary-panel-flights" icon="flight" />
      <MdPrimaryTab label="Trips" panel-id="primary-panel-trips" icon="trip" />
      <MdPrimaryTab label="Explore" panel-id="primary-panel-explore" icon="explore" />
    </MdTabs>
    <section id="primary-panel-flights" role="tabpanel" :hidden="activeIndex !== 0">Flights panel</section>
    <section id="primary-panel-trips" role="tabpanel" :hidden="activeIndex !== 1">Trips panel</section>
    <section id="primary-panel-explore" role="tabpanel" :hidden="activeIndex !== 2">Explore panel</section>
  </div>`,
});

const SecondaryTemplate = (args) => ({
  components: { MdTabs, MdSecondaryTab },
  setup() {
    const activeIndex = ref(args.modelValue);
    return { args, activeIndex };
  },
  template: `<div>
    <MdTabs v-model="activeIndex" :activation-mode="args.activationMode" aria-label="Secondary tabs">
      <MdSecondaryTab label="Overview" panel-id="secondary-panel-overview" />
      <MdSecondaryTab label="Specifications" panel-id="secondary-panel-specifications" />
    </MdTabs>
    <section id="secondary-panel-overview" role="tabpanel" :hidden="activeIndex !== 0">Overview panel</section>
    <section id="secondary-panel-specifications" role="tabpanel" :hidden="activeIndex !== 1">Specifications panel</section>
  </div>`,
});

export const PrimaryTabs = PrimaryTemplate.bind({});
export const SecondaryTabs = SecondaryTemplate.bind({});
