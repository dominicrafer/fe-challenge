import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  if (to.path !== "/login") {
    if (!auth.isAuthenticated) {
      return navigateTo("/login");
    }
  } else {
    if (auth.isAuthenticated) {
      return navigateTo("/");
    }
  }
});
