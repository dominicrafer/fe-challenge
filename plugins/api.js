import Orders from '@/api/orders';
import Branches from '@/api/branches';
import Users from '@/api/users';
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
    // const api = {
    //     orders: Orders(clientConfig()),
    //     branches: Branches(clientConfig()),
    //     users: Users(clientConfig()),
    // };
    const api = {
        orders: Orders(),
        branches: Branches(),
        users: Users(),
    };

    return {
        provide: {
            api,
        }
    }
})