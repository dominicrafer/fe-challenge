export default function () {
  // POLICY MAPPER
  // note: case sensitive
  // (Module): {
    //policy-mapped-value: policy-value-on-backend
  // }
  return {
    Userlist: {
      userList: "users:view",
      usersDelete: "users:delete",
      usersExport: "users:export",
    },
    users: {
      usersView: "users:view",
      usersDelete: "users:delete",
      usersExport: "users:export",
    },
    "users-roles": {
      usersRolesView: "users-roles:view",
      usersRolesExport: "users-roles:export",
      usersRolesDelete: "users-roles:delete",
    },
    "users-policies": {
      usersPoliciesView: "users-policies:view",
      usersPoliciesExport: "users-policies:export",
      usersPoliciesDelete: "users-policies:delete",
    },
  };
}
