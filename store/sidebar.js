import { defineStore } from 'pinia'

export const useSidebarStore = defineStore({
    id: 'sidebar',
    persist: true,
    state: () => {
        return {
            collapsed: false,
        }
    },
    actions: {
         toggleSidebar() {
            this.collapsed = !this.collapsed
        },
    },
    getters: {
        isCollapsed: state => state.collapsed,
    },
})