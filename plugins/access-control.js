export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("has", (el, binding, vnode) => {
    const { $_, $toast } = useNuxtApp();
    const mapper = permissionsMapper();
    if (binding.arg === "module-permission") {
      if (!hasModulePermission()) {
        vnode.el.hidden = true;
        return false;
      }
    }

    if (binding.arg === "action-permission") {
      el.addEventListener(
        "click",
        (event) => {
          event.stopImmediatePropagation();
          if (!hasActionPermission()) {
            $toast.error("User is not auhorized to perform this action.", {
              autoClose: 3000,
              position: $toast.POSITION.BOTTOM_CENTER,
              closeButton: false,
            });
            event.stopImmediatePropagation();
          }
        },
        { capture: true }
      );
    }

    function hasActionPermission() {
      const myPermissions = ["users:create", "users:view", "users:delete"];
      let allPermissions = {};
      $_.forEach(mapper, (permissions) => {
        $_.forEach(permissions, (value, key) => {
          allPermissions[key] = value;
        });
      });
      return $_.includes(myPermissions, allPermissions[binding.value]);
    }
    function hasModulePermission() {
      const myModulePermissions = [
        "users",
        "users-list",
        "users-roles",
        "users-policies",
        // "campaigns",
        // "partners",
        // "transactions",
      ];

      return $_.includes(myModulePermissions, binding.value);
    }
  });
});
