import Branches from '@/api/branches';
// function clientConfig() {
//     return {
//         onRequest({ request, options }) {
//             // Set the request headers
//             options.headers = options.headers || {}
//             options.headers.authorization = '...'
//         },
//         onRequestError({ request, options, error }) {
//             // Handle the request errors
//         },
//         onResponse({ request, response, options }) {
//             // Process the response data
//             return response._data
//         },
//         onResponseError({ request, response, options }) {
//             // Handle the response errors
//         }
//     }
// }

export default defineNuxtPlugin(() => {
    const api = {
        branches: Branches(),
    };
    return {
        provide: {
            api,
        }
    }
})