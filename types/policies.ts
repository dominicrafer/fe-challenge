interface PolicyDetails {
  module: string;
  policy: string;
  description: string;
}

export type PolicyListResponse = {
  resource: {
    policies: PolicyDetails[];
    last_evaluated_key: string | null;
    limit: number;
  };
  success: boolean;
};
export type PolicyListParams = {
  limit: number;
  last_evaluated_sort_key: Ref | null;
};
export type PolicyPayload = {
  actions: string[];
  policy: string;
  description: string;
};

export type PolicyDetailsResponse = {
  resource: {
    module: string;
    policy: string;
    description: string;
    actions: ActionObject[];
  };
  success: boolean;
};

interface ActionObject {
  policy_group: string;
  action: string;
  slug: string;
}
