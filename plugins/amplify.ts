import * as AmplifyStorage from 'aws-amplify/storage';
import { Amplify } from "aws-amplify";
import amplifyConfig from "@/aws-exports";

export default defineNuxtPlugin((nuxtApp) => {
  Amplify.configure(amplifyConfig)

  return {
    provide: {
      storage: AmplifyStorage,
    },
  };
});
