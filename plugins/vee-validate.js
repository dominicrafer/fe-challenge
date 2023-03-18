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

  // Customize global validation rules error message
  configure({
    generateMessage: (context) => {
      console.log(context)
      const {$_} = useNuxtApp()
      switch (context.rule.name) {
        // case "digits":
          // return "Custom Message";
          // break;
        default:
          return `${$_.startCase(context.field)} is ${context.rule.name}`;
      }
    },
  });
});
