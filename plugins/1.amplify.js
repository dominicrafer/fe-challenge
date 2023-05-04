import { Amplify, Auth, Storage } from "aws-amplify";
import amplifyConfig from "@/aws-exports";

export default defineNuxtPlugin((nuxtApp) => {
  Amplify.configure(amplifyConfig);
  return {
    provide: {
      auth: Auth,
      // Uncomment for amplify storage usage
      //   storage: Storage,
    },
  };
});
