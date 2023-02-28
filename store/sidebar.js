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
            console.log('WAT')
            this.collapsed = !this.collapsed
        },
    },
    getters: {
        isCollapsed: state => state.collapsed,
    },
})