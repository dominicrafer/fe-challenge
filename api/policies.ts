import type { PolicyDetailsResponse, PolicyListParams, PolicyListResponse, PolicyPayload } from "~/types/policies";

export default () => ({
  createPolicy(data: PolicyPayload) {
    return useFetch('/user/policy', { method: 'POST', body: data, ...interceptors() });
  },
  getPolicies(params: PolicyListParams, watch: Ref[]) {
    return useLazyFetch<PolicyListResponse>(() => '/user/policy', { method: 'GET', params, ...interceptors(), watch });
  },
  getAllPolicies() {
    return useFetch(() => '/user/policy/policy-action:all', { method: 'GET', ...interceptors() });
  },
  getPolicyDetails(id: string) {
    return useFetch<PolicyDetailsResponse>(`/user/policy/${id}`, { method: 'GET', ...interceptors() });
  },
  updatePolicy(id: string, data: PolicyPayload) {
    return useFetch(`/user/policy/${id}`, { method: 'PATCH', body: data, ...interceptors() });
  },
  deletePolicy(id: string) {
    return useFetch(`/user/policy/${id}`, { method: 'DELETE', ...interceptors() });
  },
})