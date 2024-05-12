export default () => ({
  getEmployees() {
    return useLazyFetch<any>(() => "/dev/list", { method: "GET", ...interceptors() });
  }
});
