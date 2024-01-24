export default () => ({
    myGetAPI(params) {
        return useFetch('/api', { method: 'GET', params, ...interceptors() });
    },
    myPostAPI(data) {
        return useFetch('/api', { method: 'POST', body: data, ...interceptors() });
    },
    myPatchAPI(id, data) {
        return useFetch(`/api/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
})