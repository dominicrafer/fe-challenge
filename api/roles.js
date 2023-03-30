export default () => ({
    createRole(data) {
        return useFetch('/user/role', { method: 'POST', body: data, ...interceptors() });
    },
    getCurrentUserRole() {
        return useFetch(() => '/user/role/access-policy', { method: 'GET', ...interceptors() });
    },
    getRoles(params, watch) {
        return useFetch(() => '/user/role', { method: 'GET', params, ...interceptors(), watch });
    },
    getRoleDetails(id, defaultValue) {
        return useFetch(`/user/role/${id}`, { method: 'GET', default: () => defaultValue, ...interceptors() });
    },
    updateRole(id, data) {
        return useFetch(`/user/role/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
    deleteRole(id) {
        return useFetch(`/user/role/${id}`, { method: 'DELETE', ...interceptors() });
    },
})