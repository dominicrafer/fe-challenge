import { Amplify } from "aws-amplify";
import { signIn, signOut, getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import amplifyConfig from "@/aws-exports";

export default defineNuxtPlugin((nuxtApp) => {
  Amplify.configure(amplifyConfig);

  console.log(Amplify);
  return {
    provide: {
      auth: {
        signIn,
        signOut,
        getCurrentUser,
        fetchAuthSession
      },
      // Uncomment for amplify storage usage
      //   storage: Storage,
    },
  };
});
