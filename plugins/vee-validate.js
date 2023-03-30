import { defineRule, configure, Form, Field, ErrorMessage } from "vee-validate";
import AllRules from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VForm', Form)
  nuxtApp.vueApp.component('VField', Field)
  nuxtApp.vueApp.component('VErrorMessage', ErrorMessage)
  Object.keys(AllRules)
    .filter((k) => k !== "default")
    .forEach((rule) => {
      defineRule(rule, AllRules[rule]);
    });


  defineRule('phone_number', value => {
    if (!/^(09|\+639)\d{9}$/.test(value)) {
      return 'This field must be a valid phone_number';
    }
    return true;
  });

  // Customize global validation rules error message
  configure({
    generateMessage: (context) => {
      const { $_ } = useNuxtApp()
      switch (context.rule.name) {
        case "email":
          return "This field must be a valid email";
        case "min":
          return `${$_.startCase(context.field)} must be atleast ${context.rule.params[0]} characters`;
        case "max":
          return `${$_.startCase(context.field)} must only contain ${context.rule.params[0]} characters`;
        case "required":
          return `${$_.startCase(context.field)} is required`
        case "digits":
          return `${$_.startCase(context.field)} exceeds expected value`
        default:
          return `${$_.startCase(context.field)} is invalid`;
      }
    },
  });
});
