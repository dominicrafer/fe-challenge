export default () => ({
    getBusinesses(params, watch) {
        return useFetch(() => '/business/list', { method: 'GET', params, ...interceptors(), watch });
    },
    getBusinessServices(business, watch) {
        return useFetch(() => `/business/${business}/service`, { method: 'GET', ...interceptors(), watch });
    },
    deleteBusiness(business) {
        return useFetch(`/business/${business}`, { method: 'DELETE', ...interceptors() });
    },
    createBusiness(data) {
        return useFetch('/business', { method: 'POST', body: data, ...interceptors() });
    },
    getBusinessDetails(id, defaultValue) {
        return useFetch(`/business/${id}`, { method: 'GET', default: () => defaultValue, ...interceptors() });
    },
    updateBusiness(id, data) {
        return useFetch(`/business/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
})