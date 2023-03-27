export default () => ({
    getBusinesses(params, watch) {
        return useFetch(() => '/business', { method: 'GET', params, ...interceptors(), watch });
    },
    deleteBusiness(business) {
        return useFetch(`/business/${business}`, { method: 'DELETE', ...interceptors() });
    },
})