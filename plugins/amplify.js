import { Amplify } from "aws-amplify";
import * as AmplifyAuth from "aws-amplify/auth";
import amplifyConfig from "@/aws-exports";

export default defineNuxtPlugin((nuxtApp) => {
  Amplify.configure(amplifyConfig);

  console.log(Amplify);
  return {
    provide: {
      auth: AmplifyAuth,
      // Uncomment for amplify storage usage
      //   storage: Storage,
    },
  };
});
