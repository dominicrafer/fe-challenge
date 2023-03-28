export default () => ({
    createRole(data) {
        return useFetch('/role', { method: 'POST', body: data, ...interceptors() });
    },
    getCurrentUserRole() {
        return useFetch(() => '/role/access-policy', { method: 'GET', ...interceptors() });
    },
    getRoles(params, watch) {
        return useFetch(() => '/role', { method: 'GET', params, ...interceptors(), watch });
    },
    getRoleDetails(id, defaultValue) {
        return useFetch(`/role/${id}`, { method: 'GET', default: () => defaultValue, ...interceptors() });
    },
    updateRole(id, data) {
        return useFetch(`/role/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
    deleteRole(id) {
        return useFetch(`/role/${id}`, { method: 'DELETE', ...interceptors() });
    },
})