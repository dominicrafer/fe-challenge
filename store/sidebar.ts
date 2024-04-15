import { defineStore } from "pinia";
import { useWindowSize } from "@vueuse/core";
import { type Sidebar } from "~/types/sidebar";
export const useSidebarStore = defineStore({
  id: "sidebar",
  persist: false,
  state: (): Sidebar => {
    const route = useRoute();
    const currentRoute = route.path.split("/")[1];
    return {
      collapsed: false,
      menus: [
        {
          label: "Challenge",
          name: "fe-chall-3",
          icon: "looks_3",
          path: "/",
        },
      ],
      activeMenu: route.name,
    };
  },
  actions: {
    toggleSidebar() {
      const { width } = useWindowSize();
      // if (width.value <= 1024) {
      this.collapsed = !this.collapsed;
      // }
    },
  },
  getters: {
    isCollapsed: (state) => state.collapsed,
    isMenuActive: (state) => {
      return (menuDetails: any) => {
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
