<template>
  <div class="sidebar" :class="collapsed ? 'collapsed' : 'open'">
    <div class="sidebar__header">Title / Logo</div>
    <div class="sidebar__content">
      <div class="content__menu" v-for="(menuDetails, index) in menus" :key="index" :class="
        isMenuActive(menuDetails) && !$_.has(menuDetails, 'submenus') ? 'active-menu' : 'inactive-menu'
      ">
        <router-link :to="$_.has(menuDetails, 'path') ? menuDetails.path : ''" @click="selectMenu(menuDetails)">
          <div class="menu__details">
            <div class="details__content">
              <Icon :name="menuDetails.icon" width="20" height="20"
                :color="isMenuActive(menuDetails) && !$_.has(menuDetails, 'submenus') ? '#FFFFFF' : '#748FB0'" />
              {{ menuDetails.name }}
            </div>
            <Icon name="mdi:chevron-down" width="20" height="20" v-if="menuDetails?.submenus" />
          </div>
        </router-link>
        <div v-for="(submenuDetails, submenuIndex) in menuDetails.submenus" :key="submenuIndex" class="menu__submenus"
          :class="isMenuActive(menuDetails) ? 'uncollapsed' : 'collapsed'">
          <router-link :to="submenuDetails.path">
            <div class="submenus__details" :class="activeMenu === submenuDetails.name ? 'active-menu' : 'inactive-menu'"
              @click="activeMenu
                = submenuDetails.name">
              <Icon name="mdi:chevron-down" width="20" height="20" v-if="submenuDetails?.submenus" />
              <Icon :name="submenuDetails.icon" width="20" height="20" v-else />
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
    <div class="sidebar__app-version">
      v{{config.app_version}}
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth';
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  async setup() {
    const { $_ } = useNuxtApp();
    const config = useRuntimeConfig()
    const route = useRoute();
    const activeMenu = ref(null);
    const menus = [
      {
        name: "Users",
        icon: "mdi:account-multiple-outline",
        roles: ["admin"],
        submenus: [
          {
            name: "Users",
            path: "/users",
            icon: "mdi:account-multiple-outline",
            roles: ["admin"],
          },
          {
            name: "Roles",
            path: "/users/roles",
            icon: "mdi:badge-account-horizontal-outline",
            roles: ["admin"],
          },
          {
            name: "Policies",
            path: "/users/policies",
            icon: "mdi:shield-account-variant-outline",
            roles: ["admin"],
          },
        ],
      },
      {
        name: "Partners",
        icon: "mdi:handshake-outline",
        roles: ["admin"],
        path: "/partners",
        // submenus: [
        //   {
        //     name: "Partners",
        //     path: "/partners",
        //     icon: "mdi:account-multiple-outline",
        //     roles: ["admin"],
        //   },
        // ],
      },
      {
        name: "Campaigns",
        icon: "mdi:calendar",
        path: "/campaigns",
        roles: ["admin"],
      },
      {
        name: "Transactions",
        icon: "mdi:swap-horizontal",
        path: "/transactions",
        roles: ["admin"],
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
    const { logout } = useAuthStore()
    const router = useRouter();
    async function doLogout() {
      await logout();
      router.push('/login');
    }

    // Active menu checker
    function isMenuActive(menuDetails) {
      if ($_.has(menuDetails, 'submenus')) {
        return $_.some(menuDetails.submenus, { name: activeMenu.value });
      }
      return menuDetails.name === activeMenu.value
    }

    // Select menu
    function selectMenu(menuDetails) {
      if ($_.has(menuDetails, 'submenus')) {
        console.log(menuDetails)
        router.push(menuDetails.submenus[0].path)
        return activeMenu.value = menuDetails.submenus[0].name
      }
      return activeMenu.value = menuDetails.name
    }
    return {
      menus,
      activeMenu,
      config,
      doLogout,
      isMenuActive,
      selectMenu,
    };
  },
};
</script>


<style lang="postcss" scoped>
.sidebar {
  @apply  min-w-[250px] w-[350px] h-screen bg-white;
  @apply flex flex-col z-10;
  @apply px-5 py-8 relative;
  box-shadow: 0 10px 30px -12px rgb(0 0 0 / 42%), 0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);
  transition: all 0.3s ease;

  &__header {
    @apply text-primary font-bold text-lg text-center pb-3;
    @apply border-b border-b-gray-200 flex-grow-0;
  }

  &__content {
    @apply flex flex-col w-full flex-grow;
    @apply gap-3 mt-4;

    .content__menu {
      @apply rounded-sm text-primary;

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
          @apply px-3 py-3 rounded-sm z-50 relative;
          @apply cursor-pointer;
          @apply flex flex-row gap-4;
          transition: all 0.3s ease;

          &.active-menu {
            @apply bg-primary text-white;
            box-shadow: 0 12px 20px -10px rgb(138 143 150 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(138 143 150 / 20%) !important;
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
        @apply block bg-primary text-white;
        box-shadow: 0 12px 20px -10px rgb(138 143 150 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(138 143 150 / 20%);
      }
    }
  }

  &__footer {

    .footer__logout {
      @apply text-center w-full;
    }

    /* @apply flex-grow-0 px-3 bg-gray-100 p-3 rounded-md; */
    /* box-shadow: 0 12px 20px -10px rgb(138 143 150 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(138 143 150 / 20%); */



  }

  &__app-version {
    @apply text-gray-400;
    @apply text-xs;
    @apply absolute bottom-1 right-5;
  }

  &.collapsed {
    @apply w-[60px];
  }
}
</style>