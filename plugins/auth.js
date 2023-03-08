import { useAuthStore } from "@/store/auth";
import dayjs from 'dayjs'


export default defineNuxtPlugin(({$dayjs}) => {
  const authStore = useAuthStore();
  // authStore.load();
  const tokenExpirationDayjs = dayjs(authStore.tokenExpiration)
  const currentTimeDayjs = dayjs();

  const tokenExpirationDuration = dayjs.duration(tokenExpirationDayjs.diff(currentTimeDayjs)).asMinutes();

  console.log(tokenExpirationDuration, 'tokenExpirationDuration')
  // console.log(dayjs.duration(dayjs(authStore.tokenExpiration).diff(dayjs(), 'hours'))).asMinutes();

  authStore.refresh();
  // console.log('tes');
});
