import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/login") {
    const auth = useAuthStore();
    if (!auth.isUserAuthenticated) {
      return navigateTo("/login");
    }
  }
});
