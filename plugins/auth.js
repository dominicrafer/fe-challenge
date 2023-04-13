import { useAuthStore } from "@/store/auth";
import dayjs from "dayjs";

export default defineNuxtPlugin(({ $dayjs }) => {
  const authStore = useAuthStore();
  const expirationInMinutes = dayjs
    .duration(dayjs.unix(authStore.tokenExpiration).diff(dayjs()))
    .asMinutes();
  // if token expiration < 20 mins, refresh
  if (expirationInMinutes < 20) {
    console.log('REFRESH TOKEN')
    authStore.refresh();
  }
});
