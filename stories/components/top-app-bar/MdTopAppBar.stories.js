import MdTopAppBar from '../../../src/components/top-app-bar/MdTopAppBar.vue';
export default { title: 'Components/TopAppBar', component: MdTopAppBar };
const actions = [
  { icon: 'search', label: 'Search' },
  { icon: 'more_vert', label: 'More options' },
];
export const Small = { args: { title: 'Library', navigationIcon: 'menu', actions } };
export const CenterAligned = { args: { ...Small.args, variant: 'center-aligned' } };
export const Medium = { args: { ...Small.args, variant: 'medium' } };
export const Large = { args: { ...Small.args, title: 'A long library title that keeps actions reachable on smaller screens', variant: 'large' } };
export const Collapsing = {
  render: () => ({
    components: { MdTopAppBar },
    setup: () => ({ actions }),
    template:
      '<div id="app-bar-scroll-demo" style="height:300px;overflow:auto"><MdTopAppBar title="Library" variant="large" scroll-behavior="collapse" scroll-target="#app-bar-scroll-demo" navigation-icon="menu" :actions="actions" /><div style="height:1000px;padding:16px">Scroll to collapse the title.</div></div>',
  }),
};
