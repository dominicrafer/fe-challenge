import { defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(AllRules)
    .filter((k) => k !== "default")
    .forEach((rule) => {
      defineRule(rule, AllRules[rule]);
    });

  // Customize global validation rules error message
  configure({
    generateMessage: (context) => {
      switch (context.rule.name) {
        // case "digits":
          // return "Custom Message";
          // break;
        default:
          return `The field ${context.field} is invalid`;
      }
    },
  });
});
