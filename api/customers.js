export default () => ({
    createCustomer(data) {
        return useFetch('/customer', { method: 'POST', body: data, ...interceptors() });
    },
    searchCustomer(params) {
        return useFetch('/customer/search', { method: 'GET', query: params, ...interceptors() });
    },
    getCustomers(data, watch) {
        return useLazyFetch(() => '/customer/list', { method: 'POST', body: data, ...interceptors(), watch });
    },
    getCustomerDetails(id) {
        return useFetch(`/customer/${id}`, { method: 'GET', ...interceptors() });
    },
    updateCustomer(id, data) {
        return useFetch(`/customer/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
    deleteCustomer(id) {
        return useFetch(`/customer/${id}`, { method: 'DELETE', ...interceptors() });
    },
})