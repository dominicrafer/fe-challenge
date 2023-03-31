export default () => ({
    getBanks(params, watch) {
        return useFetch(() => '/business/bank/list', { method: 'GET', params, ...interceptors(), watch });
    },
    deleteBank(accountNumber) {
        return useFetch(`/business/bank/${accountNumber}`, { method: 'DELETE', ...interceptors() });
    },
    createBank(data) {
        return useFetch('/business/bank', { method: 'POST', body: data, ...interceptors() });
    },
    getBankDetails(id, defaultValue) {
        return useFetch(`/business/bank/${id}`, { method: 'GET', default: () => defaultValue, ...interceptors() });
    },
    updateBank(id, data) {
        return useFetch(`/business/bank/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
})