
import { useAuthStore } from '@/store/auth';
export const interceptors = () => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore();
    return {
        baseURL: config.public.api_base_url,
        onRequest({ request, options }) {
            // Set the request headers
            options.headers = options.headers || {}
            options.headers.authorization = `Bearer ${authStore.token}`
        },
        onRequestError({ request, options, error }) {
            // Handle the request errors
        },
        onResponse({ request, response, options }) {
            // Process the response data
            return response._data
        },
        onResponseError({ request, response, options }) {
            // Handle the response errors
        }
    }
}