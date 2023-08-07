<template>
  <q-drawer :modelValue="!sidebarStore.isCollapsed" side="left" class="sidebar">
    <div class="sidebar__header">
      <img src="@/assets/images/ecv.svg" />
    </div>
    <q-list class="sidebar__menus">
      <template v-for="(menuDetails, index) in sidebarStore.menus">
        <q-expansion-item
          v-if="$_.has(menuDetails, 'submenus')"
          :key="`parent-${index}`"
          :icon="menuDetails.icon"
          :label="menuDetails.label"
          :default-opened="$_.some(menuDetails.submenus, { path: $route.path })"
          class="menus__menu"
        >
          <q-expansion-item
            v-for="(submenuDetails, submenuIndex) in menuDetails.submenus"
            :index="submenuIndex"
            :key="submenuIndex"
            :header-inset-level="1"
            :icon="submenuDetails.icon"
            :label="submenuDetails.label"
            :to="{ path: submenuDetails.path }"
            class="menus__menu"
            active-class="active"
            hide-expand-icon@
            :class="{ active: $route.path === submenuDetails.path }"
          />
        </q-expansion-item>
        <q-expansion-item
          v-else
          expand-separator
          :key="`child-${index}`"
          :icon="menuDetails.icon"
          :label="menuDetails.label"
          :to="{ path: menuDetails.path }"
          hide-expand-icon
          class="menus__menu"
          header-class="active"
          active-class="active"
          :class="{ active: $route.path === menuDetails.path }"
        >
        </q-expansion-item>
      </template>
    </q-list>
  </q-drawer>
</template>

<script>
import { useSidebarStore } from "@/store/sidebar";
export default {
  name: "sidebar",
  async setup() {
    const sidebarStore = useSidebarStore();

    return {
      sidebarStore,
    };
  },
  beforeUnmount() {
    this.activeMenu = null;
  },
};
</script>

<style lang="postcss">
.sidebar {
  @apply bg-primary absolute;
  @apply px-3 pt-[20px] pb-8;
  &__header {
    @apply text-white  font-bold text-lg text-center pb-3;
    @apply flex-grow-0;
    img {
      @apply m-auto w-[115px];
    }
  }
  &__menus {
    @apply mt-3;
    .menus__menu {
      @apply text-white !important;
      &.active {
        /* @apply bg-white; */
        @apply bg-[#545D7B] text-white;
      }
    }
  }
}
</style>
