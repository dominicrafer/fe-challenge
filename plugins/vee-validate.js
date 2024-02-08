import * as VeeValidate from "vee-validate";
import * as AllRules from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VForm", VeeValidate.Form);
  nuxtApp.vueApp.component("VField", VeeValidate.Field);
  nuxtApp.vueApp.component("VErrorMessage", VeeValidate.ErrorMessage);
  const { $_ } = useNuxtApp();
  $_.chain(AllRules)
    .keys()
    .value()
    .forEach((rule) => {
      VeeValidate.defineRule(rule, AllRules[rule]);
    });

  VeeValidate.defineRule("phone_number", (value) => {
    if (!/^(09|\+639)\d{9}$/.test(value)) {
      return "This field must be a valid phone_number";
    }
    return true;
  });

  VeeValidate.defineRule("has_number", (value) => {
    if (!/\d/.test(value)) {
      return "Must contain at least one number";
    }
    return true;
  });
  VeeValidate.defineRule("has_special_char", (value) => {
    if (!/[!@#$%^&*]/.test(value)) {
      return "Must contain at least one special character";
    }
    return true;
  });
  VeeValidate.defineRule("has_upper_lower_case", (value) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
      return "Must contain both uppercase and lowercase characters";
    }
    return true;
  });
  VeeValidate.defineRule("no_spaces", (value) => {
    if (/\s/g.test(value)) {
      return "This field cannot contain any spaces.";
    }
    return true;
  });

  VeeValidate.defineRule("ph_phone_number", (value) => {
    if (!/^\+639\d{9}$/g.test(value)) {
      return "Invalid mobile number format";
    }
    return true;
  });

  VeeValidate.defineRule("select_required", (value) => {
    if ($_.isArray(value)) {
      return !value.length ? false : true;
    }
    if (!value) {
      return false;
    }
    return true;
  });

  VeeValidate.defineRule("confirm_password", (value, [otherValue]) => {
    if (value !== otherValue) {
      return "Passwords do not match";
    }
    return true;
  });

  // Customize global validation rules error message
  VeeValidate.configure({
    generateMessage: (context) => {
      switch (context.rule.name) {
        case "email":
          return "Invalid email address";
        case "min":
          return `Must contain at least ${context.rule.params[0]} characters`;
        case "max":
          return `${$_.startCase(context.field)} must only contain ${
            context.rule.params[0]
          } characters`;
        case "required":
          return `Enter ${$_.startCase(context.field)}`;
        case "digits":
          return `${$_.startCase(context.field)} exceeds expected value`;
        case "phone_number":
          return `Invalid mobile number format`;
        case "select_required":
          return `Select ${$_.startCase(context.field)}`;
        default:
          return `${$_.startCase(context.field)} is invalid`;
      }
    },
  });
});
