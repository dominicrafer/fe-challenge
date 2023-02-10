export default () => ({
    getBranches(params) {
        return useFetch('/branches', { method: 'POST', ...interceptors() });
        // return $fetch('/branches', { method: 'GET'}, config);
    },
})