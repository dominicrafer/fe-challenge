export default () => ({
    createProject(data) {
        return useFetch('/project', { method: 'POST', body: data, ...interceptors() });
    },
    searchProjects(params) {
        return useFetch('/project/search', { method: 'GET', query: params, ...interceptors() });
    },
    getProjects(data, watch) {
        return useLazyFetch(() => '/project/list', { method: 'POST', body: data, ...interceptors(), watch });
    },
    getProjectDetails(id) {
        return useFetch(`/project/${id}`, { method: 'GET', ...interceptors() });
    },
    updateProject(id, data) {
        return useFetch(`/project/${id}`, { method: 'PATCH', body: data, ...interceptors() });
    },
    deleteProject(id) {
        return useFetch(`/project/${id}`, { method: 'DELETE', ...interceptors() });
    },
})