export const interceptors = () => {
  const config = useRuntimeConfig();
  const { $dayjs, $_ }: any = useNuxtApp();
  return {
    baseURL: config.public.api_base_url,
    server: false,
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
