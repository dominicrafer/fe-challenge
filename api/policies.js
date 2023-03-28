export default () => ({
  createPolicy(data) {
    return useFetch('/policy', { method: 'POST', body: data, ...interceptors() });

    // return $fetch('/branches', { method: 'GET'}, config);
  },
  getPolicies(params, watch) {
    return useFetch(() => '/policy', { method: 'GET', params, ...interceptors(), watch });
  },
  getAllPolicies(immediate = true) {
    return useLazyFetch(() => '/policy/policy-action:all', { method: 'GET', immediate, ...interceptors() });
  },
  getPolicyDetails(id, defaultValue) {
    return useFetch(`/policy/${id}`, { method: 'GET',  default: () => defaultValue, ...interceptors() });
  },
  updatePolicy(id, data) {
    return useFetch(`/policy/${id}`, { method: 'PATCH', body: data, ...interceptors() });
  },
  deletePolicy(id) {
    return useFetch(`/policy/${id}`, { method: 'DELETE', ...interceptors() });
  },
})