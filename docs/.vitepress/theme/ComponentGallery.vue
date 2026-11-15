<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const orders = [
  { id: '1048', product: 'Studio Headphones', customer: 'Avery Chen', total: 149, status: 'Delivered' },
  { id: '1047', product: 'Desk Lamp', customer: 'Jordan Lee', total: 79, status: 'Processing' },
  { id: '1046', product: 'Mechanical Keyboard', customer: 'Sam Rivera', total: 129, status: 'Shipped' },
  { id: '1045', product: 'Wireless Mouse', customer: 'Morgan Patel', total: 59, status: 'Delivered' },
  { id: '1044', product: 'USB-C Hub', customer: 'Taylor Kim', total: 49, status: 'Processing' },
];
const destinations = [
  { label: 'All orders', icon: 'dashboard' },
  { label: 'Processing', icon: 'schedule' },
  { label: 'Shipped', icon: 'local_shipping' },
  { label: 'Delivered', icon: 'check_circle' },
];
const destination = ref('All orders');
const query = ref('');
const sort = ref('recent');
const viewport = ref('wide');
const navigationOverride = ref(null);
const mobile = computed(() => viewport.value === 'phone');
const navigationOpen = computed(() => navigationOverride.value ?? viewport.value === 'wide');
const selectedDestination = computed(() => destinations.findIndex(({ label }) => label === destination.value));

let phoneQuery;
let wideQuery;
function updateViewport() {
  const size = phoneQuery.matches ? 'phone' : wideQuery.matches ? 'wide' : 'medium';
  if (size !== viewport.value) {
    viewport.value = size;
    navigationOverride.value = null;
  }
}
onMounted(() => {
  phoneQuery = window.matchMedia('(max-width: 640px)');
  wideQuery = window.matchMedia('(min-width: 960px)');
  phoneQuery.addEventListener('change', updateViewport);
  wideQuery.addEventListener('change', updateViewport);
  updateViewport();
});
onBeforeUnmount(() => {
  phoneQuery?.removeEventListener('change', updateViewport);
  wideQuery?.removeEventListener('change', updateViewport);
});

function toggleNavigation(event) {
  if (mobile.value && !navigationOpen.value) event.currentTarget.focus();
  navigationOverride.value = !navigationOpen.value;
}

function selectDestination(index) {
  destination.value = destinations[index].label;
  if (mobile.value) navigationOverride.value = false;
}
const profileOpen = ref(false);
const signedIn = ref(true);

async function openProfile() {
  // Let the menu restore focus to the avatar before the dialog captures it.
  await nextTick();
  profileOpen.value = true;
}

const visibleOrders = computed(() => {
  const search = query.value.trim().toLowerCase();
  const matches = orders.filter(
    ({ id, product, customer, status }) => (destination.value === 'All orders' || status === destination.value) && [id, product, customer].some((value) => value.toLowerCase().includes(search))
  );
  return sort.value === 'highest' ? matches.sort((a, b) => b.total - a.total) : matches;
});

const metrics = [
  { label: 'Orders', value: orders.length, icon: 'receipt_long' },
  { label: 'Revenue', value: '$' + orders.reduce((sum, order) => sum + order.total, 0), icon: 'payments' },
  { label: 'Processing', value: orders.filter(({ status }) => status === 'Processing').length, icon: 'schedule' },
  { label: 'Delivered', value: orders.filter(({ status }) => status === 'Delivered').length, icon: 'check_circle' },
];
</script>

<template>
  <div class="gallery-window">
    <div class="gallery-window-title"><span aria-hidden="true">● ● ●</span> Vue Material 3 Gallery</div>
    <MdTopAppBar class="gallery-app-bar">
      <template #navigation>
        <button
          class="gallery-menu"
          type="button"
          :aria-expanded="navigationOpen"
          aria-controls="gallery-navigation"
          :aria-haspopup="mobile ? 'dialog' : undefined"
          aria-label="Order navigation"
          @click="toggleNavigation"
        >
          <MdIcon>{{ navigationOpen ? 'menu_open' : 'menu' }}</MdIcon>
        </button>
      </template>
      <template #title>Studio Supply</template>
      <template #actions>
        <MdMenu class="gallery-profile">
          <template #activator="{ onClick, onKeydown, ariaExpanded, ariaHaspopup }">
            <button class="gallery-menu" type="button" aria-label="Account menu" :aria-expanded="ariaExpanded" :aria-haspopup="ariaHaspopup" @click="onClick" @keydown="onKeydown">
              <MdAvatar v-if="signedIn" initials="SS" aria-hidden="true" />
              <MdIcon v-else>person_outline</MdIcon>
            </button>
          </template>
          <template v-if="signedIn">
            <MdMenuItem label="Profile" icon="person" @click="openProfile" />
            <MdMenuItem label="Logout" icon="logout" @click="signedIn = false" />
          </template>
          <MdMenuItem v-else label="Sign in to demo" icon="login" @click="signedIn = true" />
        </MdMenu>
      </template>
    </MdTopAppBar>

    <MdDialog v-model="profileOpen">
      <template #header>Profile</template>
      <p class="gallery-profile-details"><strong>Studio Supply</strong><br />Demo account</p>
      <template #footer><MdTextButton label="Close" @click="profileOpen = false" /></template>
    </MdDialog>

    <div class="gallery-layout">
      <MdNavigationRail
        v-if="!mobile"
        id="gallery-navigation"
        class="gallery-rail"
        variant="expressive"
        :expanded="navigationOpen"
        :items="destinations"
        :model-value="selectedDestination"
        aria-label="Order views"
        @update:model-value="selectDestination"
      />
      <MdDialog
        v-else
        id="gallery-navigation"
        keep-mounted
        dialog-class="gallery-navigation-modal"
        :model-value="navigationOpen"
        aria-label="Order views"
        container-class="gallery-rail-dialog"
        content-class="gallery-rail-dialog-content"
        initial-focus=".gallery-collapse-navigation"
        @update:model-value="navigationOverride = $event"
      >
        <MdNavigationRail variant="expressive" expanded :items="destinations" :model-value="selectedDestination" aria-label="Order views" @update:model-value="selectDestination">
          <template #header>
            <button
              class="gallery-menu gallery-collapse-navigation"
              type="button"
              aria-label="Collapse order navigation"
              aria-expanded="true"
              aria-controls="gallery-navigation"
              @click="navigationOverride = false"
            >
              <MdIcon>menu_open</MdIcon>
            </button>
          </template>
        </MdNavigationRail>
      </MdDialog>

      <div class="gallery-main">
        <div class="gallery-metrics">
          <MdCard v-for="metric in metrics" :key="metric.label" type="filled">
            <div class="gallery-metric">
              <div>
                <span>{{ metric.label }}</span
                ><strong>{{ metric.value }}</strong>
              </div>
              <span aria-hidden="true"
                ><MdIcon>{{ metric.icon }}</MdIcon></span
              >
            </div>
          </MdCard>
        </div>

        <MdCard type="outlined" class="gallery-orders">
          <h3>{{ destination === 'All orders' ? 'Recent orders' : destination + ' orders' }}</h3>
          <div class="gallery-filters">
            <MdOutlinedTextField v-model="query" label="Search orders" />
            <MdOutlinedSelect v-model="sort" label="Sort by">
              <MdSelectOption value="recent">Most recent</MdSelectOption>
              <MdSelectOption value="highest">Highest total</MdSelectOption>
            </MdOutlinedSelect>
          </div>
          <div class="gallery-table">
            <table :aria-label="destination === 'All orders' ? 'Recent orders' : destination + ' orders'">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in visibleOrders" :key="order.id">
                  <th scope="row">
                    {{ order.product }}<small>#{{ order.id }}</small>
                  </th>
                  <td>{{ order.customer }}</td>
                  <td>
                    <span class="order-status" :data-status="order.status">{{ order.status }}</span>
                  </td>
                  <td>${{ order.total }}</td>
                </tr>
              </tbody>
            </table>
            <p v-if="!visibleOrders.length" class="gallery-empty" role="status">No orders match your search.</p>
          </div>
        </MdCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-window {
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: 24px;
  background: var(--md-sys-color-surface);
}

.gallery-window-title {
  position: relative;
  padding: 8px 16px;
  border-radius: 23px 23px 0 0;
  background: var(--md-sys-color-surface-container-highest);
  color: var(--md-sys-color-on-surface-variant);
  text-align: center;
  font-size: 13px;
  font-weight: 600;
}

.gallery-window-title span {
  position: absolute;
  inset-inline-start: 16px;
  color: var(--md-sys-color-primary);
  letter-spacing: 2px;
  font-size: 10px;
}

.gallery-window .gallery-app-bar {
  position: relative;
  overflow: visible;
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.gallery-profile :deep(.md-menu__content) {
  inset-inline: auto 0;
}

.gallery-profile-details {
  margin: 0;
}

.gallery-app-bar :deep(.md-top-app-bar__title) {
  font-size: 22px;
  line-height: 1.3;
}

.gallery-menu {
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  border-radius: 50%;
}

.gallery-menu:hover {
  background: var(--md-sys-color-surface-container-highest);
}

.gallery-collapse-navigation {
  margin-block-start: 40px;
  margin-block-end: 8px;
  color: var(--md-sys-color-on-surface);
}

.gallery-layout {
  display: flex;
}

.gallery-layout :deep(.gallery-rail-dialog) {
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: min(220px, 100%);
  min-inline-size: 0;
  max-inline-size: 100%;
  max-block-size: 100%;
  padding: 0;
  border-radius: 0 28px 28px 0;
  overflow: hidden;
}

.gallery-layout :deep(.gallery-rail-dialog-content) {
  flex: 1;
  margin: 0;
  padding: 0;
}

.gallery-layout :deep(.gallery-rail-dialog-content > .md-navigation-rail) {
  min-block-size: 100%;
}

.gallery-layout :deep(.gallery-rail-dialog-content .md-navigation-rail__expanded-label) {
  animation: none;
}

@media (prefers-reduced-motion: no-preference) {
  .gallery-layout :deep(.gallery-navigation-modal) {
    transition: display 240ms allow-discrete, overlay 240ms allow-discrete;
  }

  .gallery-layout :deep(.gallery-navigation-modal::before) {
    transition: background-color 240ms ease;
  }

  .gallery-layout :deep(.gallery-rail-dialog) {
    transform: translateX(var(--gallery-rail-slide-offset, -100%));
    transition: transform 240ms cubic-bezier(0.2, 0, 0, 1);
  }

  .gallery-layout :deep(.gallery-navigation-modal:dir(rtl)) {
    --gallery-rail-slide-offset: 100%;
  }

  .gallery-layout :deep(.gallery-navigation-modal[open] .gallery-rail-dialog) {
    transform: translateX(0);
  }

  @starting-style {
    .gallery-layout :deep(.gallery-navigation-modal[open]::before) {
      background-color: transparent;
    }

    .gallery-layout :deep(.gallery-navigation-modal[open] .gallery-rail-dialog) {
      transform: translateX(var(--gallery-rail-slide-offset, -100%));
    }
  }
}

.gallery-rail {
  border-inline-end: 1px solid var(--md-sys-color-outline-variant);
}

.gallery-rail:not(.md-navigation-rail--expanded) :deep(.md-navigation-rail__destination) {
  padding-block: 4px;
}

.gallery-main {
  flex: 1;
  min-width: 0;
  padding: clamp(12px, 2vw, 24px);
}

.gallery-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.gallery-metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 13px;
  line-height: 1.4;
}

.gallery-metric strong {
  display: block;
  font-size: 24px;
  color: var(--md-sys-color-on-surface);
}

.gallery-metric > span {
  color: var(--md-sys-color-primary);
}

.gallery-orders h3 {
  margin: 0 0 16px;
}

.gallery-filters {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(144px, 28%);
  gap: 12px;
}

.gallery-table {
  overflow-x: auto;
}

.gallery-table table {
  display: table;
  width: 100%;
  min-width: 420px;
  margin: 12px 0 0;
  font-size: 14px;
}

.gallery-table :is(th, td) {
  padding: 10px 8px;
  border: 0;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  background: transparent;
  text-align: start;
}

.gallery-table tr {
  background: transparent;
}

.gallery-table :is(th, td):last-child {
  text-align: end;
}

.gallery-table small {
  display: block;
  color: var(--md-sys-color-on-surface-variant);
}

.order-status {
  display: inline-block;
  padding: 2px 9px;
  border-radius: 999px;
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
  font-size: 12px;
  font-weight: 600;
}

.order-status[data-status='Delivered'] {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.order-status[data-status='Shipped'] {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.gallery-empty {
  text-align: center;
}

@media (max-width: 900px) {
  .gallery-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .gallery-layout {
    display: block;
  }

  .gallery-filters {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 380px) {
  .gallery-metric > span {
    display: none;
  }
}
</style>
