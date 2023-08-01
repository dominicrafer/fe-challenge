import { defineStore } from "pinia";
import { useWindowSize } from "@vueuse/core";
export const useSidebarStore = defineStore({
  id: "sidebar",
  persist: true,
  state: () => {
    const route = useRoute();
    const currentRoute = route.path.split("/")[1];
    return {
      collapsed: false,
      menus: [
        {
          label: "Users",
          name: "users",
          icon: "person",
          permission: "Users",
          collapsed: currentRoute !== "users",
          submenus: [
            {
              name: "user-list",
              label: "List",
              path: "/users",
              icon: "list",
              permission: null,
            },
            {
              name: "user-roles",
              label: "Roles",
              path: "/users/roles",
              icon: "groups",
              permission: null,
            },
            {
              name: "user-policies",
              label: "Policies",
              path: "/users/policies",
              icon: "vpn_key",
              permission: null,
            },
          ],
        },
      ],
      activeMenu: null,
    };
  },
  actions: {
    toggleSidebar() {
      const { width } = useWindowSize();
      if (width.value <= 1024) {
        this.collapsed = !this.collapsed;
      }
    },
    selectMenu(menuDetails) {
      const { $_ } = useNuxtApp();
      if ($_.has(menuDetails, "submenus")) {
        const index = $_.findIndex(this.menus, { name: menuDetails.name });
        return (this.menus[index].collapsed = !this.menus[index].collapsed);
      }
      this.toggleSidebar();
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
