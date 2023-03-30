export default () => ({
  createPolicy(data) {
    return useFetch('/user/policy', { method: 'POST', body: data, ...interceptors() });

    // return $fetch('/branches', { method: 'GET'}, config);
  },
  getPolicies(params, watch) {
    return useFetch(() => '/user/policy', { method: 'GET', params, ...interceptors(), watch });
  },
  getAllPolicies(immediate = true) {
    return useLazyFetch(() => '/user/policy/policy-action:all', { method: 'GET', immediate, ...interceptors() });
  },
  getPolicyDetails(id, defaultValue) {
    return useFetch(`/user/policy/${id}`, { method: 'GET',  default: () => defaultValue, ...interceptors() });
  },
  updatePolicy(id, data) {
    return useFetch(`/user/policy/${id}`, { method: 'PATCH', body: data, ...interceptors() });
  },
  deletePolicy(id) {
    return useFetch(`/user/policy/${id}`, { method: 'DELETE', ...interceptors() });
  },
})