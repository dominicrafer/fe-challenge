<template>
  <div class="sidebar" :class="collapsed ? 'collapsed' : 'open'">
    <div class="sidebar__header">Title</div>
    <div class="sidebar__content">
      <div
        class="content__menu"
        v-for="(menuDetails, index) in menus"
        :key="index"
        @click="activeMenu = menuDetails.name"
        :class="
          activeMenu === menuDetails.name ? 'active-menu' : 'inactive-menu'
        "
      >
        <router-link :to="$_.has(menuDetails, 'path') ? menuDetails.path : ''">
          <div class="menu__details">
            <div class="details__content">
              <Icon :name="menuDetails.icon" width="24" height="24" />
              {{ menuDetails.name }}
            </div>
            <Icon
              name="mdi:chevron-down"
              width="24"
              height="24"
              v-if="menuDetails?.submenus"
            />
          </div>
        </router-link>
        <div
          v-for="(submenuDetails, submenuIndex) in menuDetails.submenus"
          :key="submenuIndex"
          class="menu__submenus"
          :class="activeMenu === menuDetails.name ? 'uncollapsed' : 'collapsed'"
        >
          <router-link :to="submenuDetails.path">
            <div class="submenus__details">
              <Icon
                name="mdi:chevron-down"
                width="24"
                height="24"
                v-if="menuDetails?.submenus"
              />
              {{ submenuDetails.name }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="sidebar__footer"></div>
  </div>
</template>

<script>
import {
  find as _find,
  filter as _filter,
  has as _has,
  forEach as _forEach,
} from "lodash";
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  async setup() {
    const route = useRoute();
    const activeMenu = ref(null);
    const menus = [
      {
        name: "Users",
        path: "/",
        icon: "mdi:account-multiple-outline",
        roles: ["admin"],
      },
      {
        name: "Partners",
        icon: "mdi:account-multiple-outline",
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
        icon: "material-symbols:component-exchange",
        path: "/transactions",
        roles: ["admin"],
      },
    ];

    // Get active menu on page load
    onMounted(() => {
      _forEach(menus, (menuDetails) => {
        if (
          _has(menuDetails, "submenus") &&
          _find(menuDetails.submenus, {
            path: route.path,
          })
        ) {
          console.log("im here");
          activeMenu.value = _find(menuDetails.submenus, {
            path: route.path,
          }).name;
          return false;
        } else if (
          !_has(menuDetails, "submenus") &&
          menuDetails.path === route.path
        ) {
          console.log("im here2");
          activeMenu.value =
            menuDetails.path === route.path ? menuDetails.name : null;
          return false;
        }
      });
    });
    return {
      menus,
      activeMenu,
    };
  },
};
</script>


<style lang="postcss" scoped>
.sidebar {
  @apply w-[350px] bg-primary h-screen;
  transition: all 0.3s ease;
  &__header {
    @apply px-[12px] py-[19px] text-white font-bold text-lg;
    @apply border-b border-b-gray-500;
  }
  &__content {
    @apply flex flex-col  w-full;
    .content__menu {
      .menu__details {
        @apply flex flex-row items-center justify-between w-full;
        @apply text-white;
        @apply px-[12px] py-[19px] cursor-pointer;
      }
      .menu__submenus {
        @apply overflow-hidden;
        @apply text-white;
        transition: all 0.5s ease;
        .submenus__details {
          @apply pl-[40px] pr-[12px] pt-[10px] pb-[20px];
          @apply cursor-pointer;
        }
        &.collapsed {
          @apply max-h-[0px];
          /* transition: all 1s cubic-bezier(0, 1, 0, 1); */
        }
        &.uncollapsed {
          @apply max-h-[1000px];
        }
      }
      &:hover {
        @apply bg-[#202746];
      }
      &.active-menu {
        @apply bg-[#202746];
      }
    }
  }
  &.collapsed {
    @apply w-[60px];
  }
}
</style>