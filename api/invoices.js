export default () => ({
    createInvoice(data) {
        return useFetch('/invoice', { method: 'POST', body: data, ...interceptors() });
    },
    searchInvoices(params) {
        return useFetch('/invoice/search', { method: 'GET', query: params, ...interceptors() });
    },
    getInvoices(data, watch) {
        return useLazyFetch(() => '/invoice/list', { method: 'POST', body: data, ...interceptors(), watch });
    },
    getInvoiceDetails(id, defaultValue) {
        return useLazyFetch(`/invoice/${id}`, { method: 'GET', default: () => defaultValue, ...interceptors() });
    },
    updateInvoice(id, data) {
        return useFetch(`/invoice/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    }
})