export default () => ({
  createPolicy(data) {
      return useFetch('/policy', { method: 'POST',  body: data, ...interceptors() });
      // return $fetch('/branches', { method: 'GET'}, config);
  },
  getPolicies() {
    return useFetch('/policy', { method: 'GET',  ...interceptors() });
    
  }
})