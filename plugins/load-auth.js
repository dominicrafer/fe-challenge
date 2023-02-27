import { useAuthStore } from '@/store/auth';
export default defineNuxtPlugin((nuxtApp) => {
    const auth = useAuthStore();
    auth.load();
});
