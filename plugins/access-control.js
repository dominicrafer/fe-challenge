export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("has", (el, binding, vnode) => {
    const { $_, $toast } = useNuxtApp();
    console.log(binding);

    if (binding.arg === "module-permission") {
      if (!hasModulePermission()) {
        vnode.el.hidden = true;
        return false;
      }
    }

    if (binding.arg === "action-permission") {
      el.addEventListener("click", (event) => {
        if (!hasActionPermission()) {
          $toast.error("User is not auhorized to perform this action.", {
            autoClose: 3000,
            position: $toast.POSITION.BOTTOM_CENTER,
            closeButton: false,
          });
          event.stopPropagation();
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
    }

    function hasActionPermission() {
      const myPermissions = ["users:create", "users:view", "users:delete"];

      return $_.includes(myPermissions, actionPermissionsMapper()[binding.value]);
    }
    function hasModulePermission() {
      const myModulePermissions = [
        "users",
        "users-list",
        "users-roles",
        "users-policies",
        "campaigns",
        "partners"
      ];

      return $_.includes(
        myModulePermissions,
        modulePermissionsMapper()[binding.value]
      );
    }
  });
});
