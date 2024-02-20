import { useAuthStore } from "~/store/auth";
import dayjs from "dayjs";

export default defineNuxtPlugin(({ $dayjs }) => {
  const authStore = useAuthStore();
  let expirationInMinutes: null | number = null;
  if (authStore.tokenExpiration) {
    expirationInMinutes = dayjs
      .duration(dayjs.unix(authStore.tokenExpiration).diff(dayjs()))
      .asMinutes();
  }

  // if token expiration < 20 mins, refresh
  if (
    expirationInMinutes &&
    expirationInMinutes < 20 &&
    authStore.isAuthenticated
  ) {
    console.log("REFRESH TOKEN");
    authStore.refresh();
  } else if (
    expirationInMinutes &&
    expirationInMinutes > 20 &&
    authStore.isAuthenticated
  ) {
    authStore.load();
  }
});
