import { useAuthStore } from '@/store/auth';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("has", (el, binding, vnode) => {
    const myModules = useAuthStore().auth.userDetails.modules
    const myPolicies = useAuthStore().auth.userDetails.policies
    const { $_, $toast, } = useNuxtApp();
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
      if ($_.includes(myPolicies, '*:*')) {
        return true;
      }
      let allPermissions = {};
      $_.forEach(mapper, (permissions) => {
        $_.forEach(permissions, (value, key) => {
          allPermissions[key] = value;
        });
      });

      return $_.includes(myPolicies, allPermissions[binding.value]);
    }
    function hasModulePermission() {
      console.log(myModules, 'myModules', binding.value)
      if ($_.includes(myModules, 'All')) {
        return true;
      }
      return $_.includes(myModules, binding.value);
    }
  });
});
