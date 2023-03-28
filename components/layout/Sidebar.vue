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
      <div class="sidebar__header">Title / Logo</div>
      <div class="sidebar__content">
        <div
          class="content__menu"
          v-for="(menuDetails, index) in menus"
          :key="index"
          :class="
            isMenuActive(menuDetails) && !$_.has(menuDetails, 'submenus')
              ? 'active-menu'
              : 'inactive-menu'
          "
        >
          <router-link
            :to="$_.has(menuDetails, 'path') ? menuDetails.path : ''"
            @click="selectMenu(menuDetails)"
            v-has:[menuDetails.permission]:module-permission="
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
                    isMenuActive(menuDetails) &&
                    !$_.has(menuDetails, 'submenus')
                      ? '#FFFFFF'
                      : '#FFFFFF'
                  "
                />
                {{ menuDetails.name }}
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
            v-for="(submenuDetails, submenuIndex) in menuDetails.submenus"
            :key="submenuIndex"
            class="menu__submenus"
            :class="isMenuActive(menuDetails) ? 'uncollapsed' : 'collapsed'"
            v-has:[submenuDetails.permission].module-permission="
              submenuDetails.permission
            "
          >
            <router-link :to="submenuDetails.path">
              <div
                class="submenus__details"
                :class="
                  activeMenu === submenuDetails.name
                    ? 'active-menu'
                    : 'inactive-menu'
                "
                @click="activeMenu = submenuDetails.name"
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
                {{ submenuDetails.name }}
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
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  async setup(props) {
    const { $_ } = useNuxtApp();
    const config = useRuntimeConfig();
    const route = useRoute();
    const activeMenu = ref(null);

    const menus = [
      {
        name: "Users",
        icon: "mdi:account-multiple-outline",
        submenus: [
          {
            name: "List",
            path: "/users",
            icon: "mdi:account-multiple-outline",
            permission: "Users",
          },
          {
            name: "Roles",
            path: "/users/roles",
            icon: "mdi:badge-account-horizontal-outline",
            permission: "Roles",
          },
          {
            name: "Policies",
            path: "/users/policies",
            icon: "mdi:shield-account-variant-outline",
            permission: "Policies",
          },
        ],
      },
      {
        name: "Businesses",
        icon: "mdi:account-multiple-outline",
        permission: "businesses",
        submenus: [
          {
            name: "Businesses",
            path: "/businesses",
            icon: "mdi:account-multiple-outline",
            permission: "businesses",
          },
          {
            name: "Banks",
            path: "/banks",
            icon: "mdi:badge-account-horizontal-outline",
            permission: "banks",
          },
        ],
      },
    ];

    // Get active menu on page load
    $_.forEach(menus, (menuDetails) => {
      if (
        $_.has(menuDetails, "submenus") &&
        $_.find(menuDetails.submenus, {
          path: route.path,
        })
      ) {
        activeMenu.value = $_.find(menuDetails.submenus, {
          path: route.path,
        }).name;
        return false;
      } else if (
        !$_.has(menuDetails, "submenus") &&
        menuDetails.path === route.path
      ) {
        activeMenu.value =
          menuDetails.path === route.path ? menuDetails.name : null;
        return false;
      }
    });

    // Logout
    const { logout } = useAuthStore();
    const router = useRouter();
    async function doLogout() {
      await logout();
      router.push("/login");
    }

    // Active menu checker
    function isMenuActive(menuDetails) {
      if ($_.has(menuDetails, "submenus")) {
        return $_.some(menuDetails.submenus, { name: activeMenu.value }) || menuDetails.name === activeMenu.value;
      }
      return menuDetails.name === activeMenu.value;
    }

    // Select menu
    function selectMenu(menuDetails) {
      return (activeMenu.value = menuDetails.name);
    }

    // Sidebar click outside handler
    const { width } = useWindowSize();
    const sidebarStore = useSidebarStore();
    const drawer = ref("sidebar");
    onClickOutside(drawer, () => {
      if (!sidebarStore.isCollapsed && width.value <= 1024) {
        sidebarStore.toggleSidebar();
      }
    });

    // Track window size for sidebar behaviour
    watch(
      () => width.value,
      (val) => {
        if (width.value >= 1024) {
          if (sidebarStore.isCollapsed) {
            sidebarStore.toggleSidebar();
          }
        }
      }
    );

    return {
      menus,
      activeMenu,
      config,
      doLogout,
      isMenuActive,
      selectMenu,
      sidebarStore,
    };
  },
};
</script>

<style lang="postcss" scoped>
.sidebar {
  @apply min-w-[300px] bg-primary;
  @apply flex flex-col relative;
  @apply px-3 py-8  z-[100];
  box-shadow: 0 10px 30px -12px rgb(0 0 0 / 42%),
    0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);
  transition: all 0.3s ease;

  &__header {
    @apply text-white  font-bold text-lg text-center pb-3;
    @apply border-b border-b-slate-500 flex-grow-0;
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

    @apply w-0  min-w-0 absolute  h-screen p-0;
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
