export default () => ({
  createPolicy(data) {
    return useFetch('/policy', { method: 'POST', body: data, ...interceptors() });

    // return $fetch('/branches', { method: 'GET'}, config);
  },
  getPolicies(params, watch) {
    return useFetch(() => '/policy', { method: 'GET', params, ...interceptors(), watch });
  },
  getAllPolicies() {
    return useFetch(() => '/policy/policy-action:all', { method: 'GET', ...interceptors() });
  },
  getPolicyDetails(id) {
    return useLazyFetch(`/policy/${id}`, { method: 'GET', ...interceptors() });
  },
  updatePolicy(id, data) {
    return useFetch(`/policy/${id}`, { method: 'PATCH', body: data, ...interceptors() });
  },
  deletePolicy(id) {
    return useFetch(`/policy/${id}`, { method: 'DELETE', ...interceptors() });
  },
})