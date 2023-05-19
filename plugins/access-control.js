import { useAuthStore } from "@/store/auth";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("has", (el, binding, vnode) => {
    const myModules = useAuthStore().auth.userDetails.modules;
    const myPolicies = useAuthStore().auth.userDetails.policies;
    const { $_, $toast } = useNuxtApp();

    if (!binding.value && !binding.arg) {
      return;
    }

    // Hides elements / display
    if (binding?.modifiers["read-module-permission"]) {
      if (!hasModulePermission()) {
        // for flex elements
        vnode.el.className = "hidden";
        vnode.el.hidden = true;
        return false;
      }
    }
    if (binding?.modifiers["read-data-permission"]) {
      if (!hasActionPermission()) {
        // for flex elements
        vnode.el.className = "hidden";
        vnode.el.hidden = true;
        return false;
      }
    }

    // Disables inputs
    if (binding?.modifiers["edit-permission"]) {
      if (!hasActionPermission()) {
        vnode.ctx.props.disabled = true;
      }
    }

    // Prevents click
    if (binding?.modifiers["action-permission"]) {
      // console.log(binding, vnode, myPolicies);
      el.addEventListener(
        "click",
        (event) => {
          if (!hasActionPermission()) {
            $toast.error("User is not auhorized to perform this action.", {
              autoClose: 3000,
              position: $toast.POSITION.BOTTOM_CENTER,
              closeButton: false,
            });
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
          }
        },
        { capture: true }
      );
    }

    function hasActionPermission() {
      if (
        $_.includes(myPolicies, "*:*") ||
        $_.includes(myPolicies, `${$_.toLower(binding.arg)}:*`)
      ) {
        return true;
      }
      let hasPermission = $_.includes(myPolicies, binding.value);
      if ($_.isArray(binding.value)) {
        hasPermission =
          $_.difference(binding.value, myPolicies).length !==
          binding.value.length;
      }
      return hasPermission;
    }
    function hasModulePermission() {
      if ($_.includes(myModules, "All")) {
        return true;
      }
      if ($_.isArray(binding.arg)) {
        return (
          $_.difference(binding.arg, myModules).length !== binding.arg.length
        );
      }
      return $_.includes(myModules, binding.arg);
    }
  });
});
