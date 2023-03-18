export default () => ({
  createPolicy(data) {
    return useFetch('/policy', { method: 'POST', body: data, ...interceptors() });
    // return $fetch('/branches', { method: 'GET'}, config);
  },
  getPolicies(params, watch) {
    return useFetch(() => '/policy', { method: 'GET', params, ...interceptors(), watch });
  },
  getPolicyDetails(id) {
    return useLazyFetch(`/policy/${id}`, { method: 'GET', server: false, ...interceptors() });
  },
  updatePolicy(id, data) {
    return useFetch(`/policy/${id}`, { method: 'PATCH', body: data, ...interceptors() });
  },
  deletePolicy(id) {
    return useFetch(`/policy/${id}`, { method: 'DELETE', ...interceptors() });
  },
})