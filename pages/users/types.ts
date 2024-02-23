export type Params = {
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

export type RoleObject = {
  label: string;
  value: string;
};

export type UserCreatePayload = {
  email: string;
  employee_number: string;
  first_name: string;
  last_name: string;
  partners: object[];
  password: string;
  phone_number: string;
  role: string;
};
