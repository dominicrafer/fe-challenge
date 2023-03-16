import { useAuthStore } from "@/store/auth";
import dayjs from "dayjs";

export default defineNuxtPlugin(({ $dayjs }) => {
  const authStore = useAuthStore();
  // authStore.load();
  const tokenExpirationDayjs = dayjs(authStore.tokenExpiration);
  const currentTimeDayjs = dayjs();

  const tokenExpirationDuration = dayjs
    .duration(tokenExpirationDayjs.diff(currentTimeDayjs))
    .asMinutes();

  const expirationInMinutes = dayjs
    .duration(dayjs.unix(authStore.tokenExpiration).diff(dayjs()))
    .asMinutes();
  // if token expiration < 20 mins, refresh
  if (expirationInMinutes < 20) {
    console.log('REFRESH TOKEN')
    authStore.refresh();
  }
});
