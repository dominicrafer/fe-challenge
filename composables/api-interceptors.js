import { useAuthStore } from "@/store/auth";
export const interceptors = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const { $dayjs, $_ } = useNuxtApp();
  return {
    baseURL: config.public.api_base_url,
    server: false,
    async onRequest({ request, options }) {
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
    onRequestError({ request, options, error }) {
      // Handle the request errors
      // return Promise.reject(error)
    },
    onResponse({ request, response, options }) {
      // Process the response data
      return response._data;
    },
    onResponseError({ request, response, options }) {
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
