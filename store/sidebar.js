import { defineStore } from "pinia";
import { useWindowSize } from "@vueuse/core";
export const useSidebarStore = defineStore({
  id: "sidebar",
  persist: false,
  state: () => {
    const { $_ } = useNuxtApp();
    const route = useRoute();
    const currentRoute = route.path.split("/")[1];
    console.log(currentRoute)
    return {
      collapsed: false,
      menus: [
        {
          label: "Users",
          name: "users",
          icon: "mdi:account-multiple-outline",
          permission: ["Users", "Roles", "Policies"],
          collapsed: currentRoute !== "users",
          submenus: [
            {
              name: "user-list",
              label: "List",
              path: "/users",
              icon: "mdi:account-multiple-outline",
              permission: "Users",
            },
            {
              name: "user-roles",
              label: "Roles",
              path: "/users/roles",
              icon: "mdi:badge-account-horizontal-outline",
              permission: "Roles",
            },
            {
              name: "user-policies",
              label: "Policies",
              path: "/users/policies",
              icon: "mdi:shield-account-variant-outline",
              permission: "Policies",
            },
          ],
        },
      ],
      activeMenu: route.name,
    };
  },
  actions: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
    selectMenu(menuDetails) {
      const { $_ } = useNuxtApp();
      if ($_.has(menuDetails, "submenus")) {
        const index = $_.findIndex(this.menus, { name: menuDetails.name });
        return (this.menus[index].collapsed = !this.menus[index].collapsed);
      }
      const { width } = useWindowSize();
      if (width.value <= 1024) {
        this.toggleSidebar();
      }
      return (this.activeMenu = menuDetails.name);
    },
  },
  getters: {
    isCollapsed: (state) => state.collapsed,
    isMenuActive: (state) => {
      return (menuDetails) => {
        const { $_ } = useNuxtApp();
        if ($_.has(menuDetails, "submenus")) {
          return (
            $_.some(menuDetails.submenus, { name: state.activeMenu }) ||
            menuDetails.name === state.activeMenu
          );
        }
        return menuDetails.name === state.activeMenu;
      };
    },
  },
});
