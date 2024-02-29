import type {
  UserCreatePayload,
  UserListParams,
  UserStatusUpdatePayload,
  UserListResponse,
  UserDetailsObject,
} from "~/types/users";

export default () => ({
  createUser(data: UserCreatePayload) {
    return useFetch("/user", { method: "POST", body: data, ...interceptors() });
  },
  getAllUsers() {
    return useLazyFetch(() => "/user", { method: "GET", ...interceptors() });
  },
  getUsers(data: UserListParams) {
    return useLazyFetch<UserListResponse>(() => "/user/list", {
      method: "POST",
      body: data,
      ...interceptors(),
    });
  },
  async getUserDetails(id: number) {
    return await useFetch<UserDetailsObject>(`/user/${id}`, {
      method: "GET",
      ...interceptors(),
    });
  },
  updateUser(id: string, data: UserCreatePayload) {
    return useFetch(`/user/${id}`, {
      method: "PATCH",
      body: data,
      ...interceptors(),
    });
  },
  updateUserStatus(data: UserStatusUpdatePayload) {
    return useFetch(`/user/user-status`, {
      method: "PATCH",
      body: data,
      ...interceptors(),
    });
  },
});
