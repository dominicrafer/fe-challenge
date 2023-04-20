export default () => ({
    createUser(data) {
        return useFetch('/user', { method: 'POST', body: data, ...interceptors() });
    },
    searchUsers(params) {
        return useFetch('/user/search', { method: 'GET', query: params, ...interceptors() });
    },
    getAllUsers() {
        return useLazyFetch(() => '/user', { method: 'GET', ...interceptors() });
    },
    getUsers(data) {
        return useLazyFetch(() => '/user/list', { method: 'POST', body: data, ...interceptors() });
    },
    getUserDetails(id) {
        return useFetch(`/user/${id}`, { method: 'GET', ...interceptors() });
    },
    updateUser(id, data) {
        return useFetch(`/user/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
    updateUserStatus(data) {
        return useFetch(`/user/user-status`, { method: 'PATCH', body:data, ...interceptors() });
    },
    resetPassword(data) {
        return useFetch(`user/reset-password`, { method: 'PATCH', body: data, ...interceptors() })
    }
})