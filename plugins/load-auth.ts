import { useAuthStore } from '~/store/auth';
export default defineNuxtPlugin((nuxtApp) => {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
        auth.load();
    }
});
