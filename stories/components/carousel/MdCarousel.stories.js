import { ref } from 'vue';
import MdCarousel from '../../../src/components/carousel/MdCarousel.vue';
import mountains from '../../assets/mountains.svg';
import coast from '../../assets/coast.svg';
import forest from '../../assets/forest.svg';

export default {
  title: 'Components/Carousel',
  component: MdCarousel,
  parameters: { layout: 'padded' },
};
const items = [
  { id: 'coast', label: 'Find your quiet coast', image: coast, alt: 'Illustration of a turquoise bay and a sandy coastline' },
  { id: 'mountains', label: 'Take the scenic route', image: mountains, alt: 'Illustration of snow-capped mountains above an alpine lake' },
  { id: 'forest', label: 'Get lost in the green', image: forest, alt: 'Illustration of a winding trail through a sunlit forest' },
  { id: 'weekend', label: 'Make room for a weekend away', image: coast, alt: 'Illustration of a sheltered beach below green cliffs' },
];
const render =
  (dir = 'ltr', custom = false) =>
  () => ({
    components: { MdCarousel },
    setup() {
      return { selected: ref(0), items, dir, custom };
    },
    template: `<section :dir="dir" style="max-width: 1100px; margin: 32px auto; font-family: Roboto, sans-serif; color: var(--md-sys-color-on-surface)">
    <p style="margin: 0 0 8px; font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase">A little inspiration</p>
    <h2 style="margin: 0 0 24px; font-size: 32px; line-height: 40px; font-weight: 400">Where will you go next?</h2>
    <MdCarousel v-model="selected" :items="items" aria-label="Explore destinations" style="--md-carousel-item-height: 300px">
      <template v-if="custom" #item="{ item }"><a :href="'#' + item.id" style="display: block; height: 100%; position: relative; color: white"><img :src="item.image" :alt="item.alt" style="width: 100%; height: 100%; object-fit: cover" /><span style="position: absolute; inset: auto 0 0; padding: 48px 24px 24px; background: linear-gradient(transparent, #102a36e6); font-size: 22px">{{ item.label }}</span></a></template>
    </MdCarousel>
  </section>`,
  });
export const Browse = { render: render() };
export const CustomItems = { render: render('ltr', true) };
export const RightToLeft = { render: render('rtl') };
