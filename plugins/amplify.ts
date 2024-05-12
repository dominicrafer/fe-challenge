import * as AmplifyStorage from "aws-amplify/storage";
import * as AmplifyAuth from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import amplifyConfig from "~/aws-exports";

export default defineNuxtPlugin(async (nuxtApp) => {
  Amplify.configure(amplifyConfig);
  
  return {
    provide: {
      auth: AmplifyAuth,
      storage: AmplifyStorage
    }
  };
});
