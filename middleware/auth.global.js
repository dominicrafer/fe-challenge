import { useAuthStore } from '@/store/auth';
export default defineNuxtRouteMiddleware((to, from, store) => {
    if (to.path !== '/login') {
        const auth = useAuthStore();
        if (!auth.isUserAuthenticated) {
            return navigateTo('/login')
        }
    }
})