import { ref } from 'vue';
import MdSearch from '../../../src/components/search/MdSearch.vue';
import MdAvatar from '../../../src/components/avatar/MdAvatar.vue';

export default {
  title: 'Components/Search',
  component: MdSearch,
  args: {
    modelValue: '',
    placeholder: 'Search components',
    supportingText: 'Press Enter to search',
    showAvatar: true,
    trailingIcon: 'close',
  },
};

const Template = (args) => ({
  components: { MdSearch, MdAvatar },
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
      :trailing-icon="args.trailingIcon"
    >
      <template #avatar>
        <MdAvatar initials="VM" />
      </template>
    </MdSearch>
  </div>`,
});

export const Search = Template.bind({});
