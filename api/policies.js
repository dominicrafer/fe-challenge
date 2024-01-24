export default () => ({
  createPolicy(data) {
    return useFetch('/user/policy', { method: 'POST', body: data, ...interceptors() });
  },
  getPolicies(params, watch) {
    return useLazyFetch(() => '/user/policy', { method: 'GET', params, ...interceptors(), watch });
  },
  getAllPolicies() {
    return useFetch(() => '/user/policy/policy-action:all', { method: 'GET', ...interceptors() });
  },
  getPolicyDetails(id) {
    return useFetch(`/user/policy/${id}`, { method: 'GET', ...interceptors() });
  },
  updatePolicy(id, data) {
    return useFetch(`/user/policy/${id}`, { method: 'PATCH', body: data, ...interceptors() });
  },
  deletePolicy(id) {
    return useFetch(`/user/policy/${id}`, { method: 'DELETE', ...interceptors() });
  },
})