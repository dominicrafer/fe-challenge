import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(duration);
  return {
    provide: {
      dayjs: dayjs,
    },
  };
});
