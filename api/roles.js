export default () => ({
    createRole(data) {
        return useFetch('/role', { method: 'POST', body: data, ...interceptors() });
    },
    getAllRoles() {
        return useLazyFetch(() => '/role', { method: 'GET', ...interceptors() });
    },
    getRoles(params, watch) {
        return useFetch(() => '/role', { method: 'GET', params, ...interceptors(), watch });
    },
    getRoleDetails(id) {
        return useLazyFetch(`/role/${id}`, { method: 'GET', ...interceptors() });
    },
    updateRole(id, data) {
        return useFetch(`/role/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
    deleteRole(id) {
        return useFetch(`/role/${id}`, { method: 'DELETE', ...interceptors() });
    },
})