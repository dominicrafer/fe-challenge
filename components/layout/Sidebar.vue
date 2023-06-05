<template>
  <div>
    <Transition appear name="fade">
      <div class="overlay" v-show="!sidebarStore.isCollapsed"></div>
    </Transition>
    <div
      class="sidebar"
      :class="
        sidebarStore.isCollapsed ? 'drawer-collapsed' : 'drawer-uncollapsed'
      "
      ref="sidebar"
    >
      <div class="sidebar__header">
        <img src="@/assets/images/pal-logo.svg" />
      </div>
      <div class="sidebar__content">
        <div
          class="content__menu"
          v-for="(menuDetails, index) in sidebarStore.menus"
          :key="index"
          :class="
            sidebarStore.isMenuActive(menuDetails) &&
            !$_.has(menuDetails, 'submenus')
              ? 'active-menu'
              : 'inactive-menu'
          "
          v-has:[menuDetails.permission].read-module-permission="
            menuDetails.permission
          "
        >
          <router-link
            v-if="$_.has(menuDetails, 'path')"
            :to="menuDetails.path"
            @click="sidebarStore.selectMenu(menuDetails)"
            v-has:[menuDetails.permission]:read-module-permission="
              menuDetails.permission
            "
          >
            <div class="menu__details">
              <div class="details__content">
                <Icon
                  :name="menuDetails.icon"
                  width="20"
                  height="20"
                  :color="
                    sidebarStore.isMenuActive(menuDetails) &&
                    !$_.has(menuDetails, 'submenus')
                      ? '#FFFFFF'
                      : '#FFFFFF'
                  "
                />
                {{ menuDetails.label }}
              </div>
              <Icon
                name="mdi:chevron-down"
                width="20"
                height="20"
                v-if="menuDetails?.submenus"
              />
            </div>
          </router-link>
          <div
            v-else
            @click="sidebarStore.selectMenu(menuDetails)"
            v-has:[menuDetails.permission]:read-module-permission="
              menuDetails.permission
            "
          >
            <div class="menu__details">
              <div class="details__content">
                <Icon
                  :name="menuDetails.icon"
                  width="20"
                  height="20"
                  :color="
                    sidebarStore.isMenuActive(menuDetails) &&
                    !$_.has(menuDetails, 'submenus')
                      ? '#FFFFFF'
                      : '#FFFFFF'
                  "
                />
                {{ menuDetails.label }}
              </div>
              <Icon
                name="mdi:chevron-down"
                width="20"
                height="20"
                v-if="menuDetails?.submenus"
              />
            </div>
          </div>
          <div
            v-for="(submenuDetails, submenuIndex) in menuDetails.submenus"
            :key="`${submenuDetails.name}-${submenuIndex}`"
            class="menu__submenus"
            :class="!menuDetails.collapsed ? 'uncollapsed' : 'collapsed'"
            v-has:[submenuDetails.permission].read-module-permission="
              submenuDetails.permission
            "
          >
            <router-link :to="submenuDetails.path">
              <div
                class="submenus__details"
                :class="
                  sidebarStore.activeMenu === submenuDetails.name
                    ? 'active-menu'
                    : 'inactive-menu'
                "
                @click="sidebarStore.selectMenu(submenuDetails)"
              >
                <Icon
                  name="mdi:chevron-down"
                  width="20"
                  height="20"
                  v-if="submenuDetails?.submenus"
                />
                <Icon
                  :name="submenuDetails.icon"
                  width="20"
                  height="20"
                  v-else
                />
                {{ submenuDetails.label }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="sidebar__footer">
        <Button variant="danger" class="footer__logout" @click="doLogout">
          <template #icon-start>
            <Icon name="mdi:shutdown" width="20" height="20" />
          </template>
          Logout
        </Button>
      </div>
      <div class="sidebar__app-version">v{{ config.app_version }}</div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useSidebarStore } from "@/store/sidebar";
import { onClickOutside, useWindowSize } from "@vueuse/core";
export default {
  name: "sidebar",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  async setup(props) {
    const config = useRuntimeConfig();
    const sidebarStore = useSidebarStore();

    // Logout
    const { logout } = useAuthStore();
    const router = useRouter();
    async function doLogout() {
      await logout();
      router.push("/login");
    }

    // Sidebar click outside handler
    const sidebar = ref(null);
    onClickOutside(sidebar, () => {
      const { width } = useWindowSize();
      if (width.value <= 1024 && !sidebarStore.isCollapsed) {
        sidebarStore.toggleSidebar();
      }
    });

    return {
      config,
      doLogout,
      sidebar,
      sidebarStore,
    };
  },
  beforeUnmount() {
    this.activeMenu = null;
  },
};
</script>

<style lang="postcss" scoped>
.sidebar {
  @apply min-w-[300px] bg-primary;
  @apply flex flex-col relative;
  @apply px-3 pt-[20px] pb-8  z-[100] overflow-y-auto;
  box-shadow: 0 10px 30px -12px rgb(0 0 0 / 42%),
    0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);
  transition: all 0.3s ease;

  &__header {
    @apply text-white  font-bold text-lg text-center pb-3;
    @apply flex-grow-0;
    img {
      @apply m-auto;
    }
  }

  &__content {
    @apply flex flex-col w-full flex-grow;
    @apply gap-3 mt-4;

    .content__menu {
      @apply rounded-sm text-white;

      .menu__details {
        @apply flex flex-row items-center justify-between w-full;
        @apply cursor-pointer py-3 px-5;

        .details__content {
          @apply flex flex-row gap-4;
        }
      }

      .menu__submenus {
        @apply ml-[28px];

        .submenus__details {
          @apply px-3 py-3 rounded-sm relative;
          @apply cursor-pointer;
          @apply flex flex-row gap-4;
          transition: all 0.3s ease;

          &.active-menu {
            @apply bg-secondary text-white;
            /* box-shadow: 0 12px 20px -10px rgb(138 143 150 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(138 143 150 / 20%) !important; */
          }
        }

        &.collapsed {
          @apply max-h-[0px] overflow-hidden;
          transition: all 0.3s cubic-bezier(0, 1, 0, 1);
        }

        &.uncollapsed {
          @apply max-h-[1000px] overflow-visible;
        }
      }

      &:hover {
        transition: all 300ms ease;
        background: rgba(200, 200, 200, 0.2);
      }

      &.active-menu {
        @apply block bg-secondary text-white;
        /* box-shadow: 0 12px 20px -10px rgb(138 143 150 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(138 143 150 / 20%); */
      }
    }
  }

  &__footer {
    .footer__logout {
      @apply text-center w-full;
    }
  }

  &__app-version {
    @apply text-gray-400;
    @apply text-xs;
    @apply absolute bottom-1 right-5;
  }

  &.drawer-uncollapsed {
    @apply max-lg:absolute h-screen flex w-[300px];
    transition: all 0.3s ease;
  }

  &.drawer-collapsed {
    > div {
      @apply hidden;
    }

    /* @apply absolute; */
    @apply w-0  min-w-0   h-screen p-0;
    transition: all 0.3s ease;
  }
}

.overlay {
  @apply lg:hidden !important;
  @apply z-[99];
  @apply w-screen h-screen fixed top-0 px-0 py-0;
  background: rgba(30, 28, 28, 0.88);
  transition: all 0.3s ease !important;
}
</style>
