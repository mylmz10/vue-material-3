import { ref } from 'vue';
import MdSearch from '../../../src/components/search/MdSearch.vue';
export default {
  title: 'Components/Search',
  component: MdSearch,
  args: {
    modelValue: '',
    placeholder: 'Search trips',
    supportingText: '',
    showAvatar: false,
  },
};

const Template = (args) => ({
  components: { MdSearch },
  setup() {
    const value = ref(args.modelValue);
    return { args, value };
  },
  template: `<div style="max-width: 560px;">
    <MdSearch
      v-model="value"
      :placeholder="args.placeholder"
      :supporting-text="args.supportingText"
      :show-avatar="args.showAvatar"
    />
  </div>`,
});

export const Search = Template.bind({});
