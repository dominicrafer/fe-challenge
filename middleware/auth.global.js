import { useAuthStore } from '@/store/auth';
export default defineNuxtRouteMiddleware((to, from, store) => {
    console.log(to)
    if (to.path !== '/login') {
        const auth = useAuthStore();
        if (!auth.isUserAuthenticated) {
            return navigateTo('/login')
        }
    }
})