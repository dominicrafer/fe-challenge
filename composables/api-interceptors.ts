import { useAuthStore } from "~/store/auth";
export const interceptors = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const { $dayjs, $_ }: any = useNuxtApp();
  return {
    baseURL: config.public.api_base_url,
    server: false,
    async onRequest({ options }: any) {
      // Set the request headers
      const expirationInMinutes = $dayjs
        .duration($dayjs.unix(authStore.tokenExpiration).diff($dayjs()))
        .asMinutes();
      // if token expiration < 20 mins, refresh
      if (expirationInMinutes < 20) {
        await authStore.refresh();
      }
      options.headers = options.headers || {};
      options.headers.authorization = `Bearer ${authStore.token}`;
    },

    onResponse({ response }: any) {
      // Process the response data
      return response._data;
    },
    onResponseError({ response }: any) {
      const { $toast } = useNuxtApp();
      $toast.error(response._data.errorCode);
      if (
        $_.includes(
          ["SERVER_ERROR", "UNAUTHORIZED_EXCEPTION"],
          response._data.errorCode
        )
      ) {
        showError({
          statusCode: response.status,
        });
      } else {
        throw createError({
          statusCode: response.status,
          data: response._data,
        });
      }
    },
  };
};
