import type { RoleObject } from "./roles";

export type UserListParams = {
  page: number;
  page_size: number;
  return_count: boolean;
  sorts: string[];
  search_filters: object[] | undefined;
  in_filters: object[] | undefined;
  between_filters: object[] | undefined;
};

export type Filters = {
  filterBy: object[];
  statuses: object[];
  roles: object[];
  created_at: string[];
};

export type UserCreatePayload = {
  email?: string | null;
  employee_number?: string;
  first_name?: string;
  last_name?: string;
  partners?: object[];
  password?: string;
  phone_number?: string;
  role?: RoleObject | string | any;
};
export type UserCreatePayloadKeys = keyof UserCreatePayload;
export type UserStatusUpdatePayload = {
  cognito_id: string;
};

export interface UserDetailsObject {
  cognito_id: string;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  role: string | null;
  status: string;
  created_at: string;
  created_by: string;
  created_by_uuid: string | null;
  updated_at: string | null;
  updated_by: string | null;
  updated_by_uuid: string | null;
}
interface PaginationResponse {
  total_count: number | undefined;
  page: number;
  page_size: number;
}
export type UserListResponse = {
  resource: {
    data: UserDetailsObject[];
    pagination: PaginationResponse;
  };
  success: boolean;
};
