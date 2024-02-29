export interface RoleDetails {
  module: string;
  role: string;
  description: string;
}

export type RoleListResponse = {
  resource: {
    roles: RoleDetails[];
    last_evaluated_key: string | null;
    limit: number;
  };
  success: boolean;
};
export type RolesListParams = {
  limit: number;
  last_evaluated_sort_key: Ref | null;
};
export type RolePayload = {
  policies: string[];
  role: string;
  description: string;
};

export type RoleDetailsResponse = {
  resource: {
    module: string;
    role: string;
    description: string;
    policies: string[];
  };
  success: boolean;
};

export type RoleObject = {
  label: string;
  value: string;
};
