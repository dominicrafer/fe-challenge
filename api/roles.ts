import type {
  RoleDetailsResponse,
  RoleListResponse,
  RolePayload,
  RolesListParams,
} from "~/types/roles";

export default () => ({
  createRole(data: RolePayload) {
    return useFetch("/user/role", {
      method: "POST",
      body: data,
      ...interceptors(),
    });
  },
  getCurrentUserRole() {
    return useFetch(() => "/user/role/access-policy", {
      method: "GET",
      ...interceptors(),
    });
  },
  getRoles(params?: RolesListParams, watch?: Ref[]) {
    return useLazyFetch<RoleListResponse>(() => "/user/role", {
      method: "GET",
      params,
      ...interceptors(),
      watch,
    });
  },
  getRoleDetails(id: string) {
    return useFetch<RoleDetailsResponse>(`/user/role/${id}`, {
      method: "GET",
      ...interceptors(),
    });
  },
  updateRole(id: string, data: RolePayload) {
    return useFetch(`/user/role/${id}`, {
      method: "PATCH",
      body: data,
      ...interceptors(),
    });
  },
  deleteRole(id: string) {
    return useFetch(`/user/role/${id}`, {
      method: "DELETE",
      ...interceptors(),
    });
  },
});
