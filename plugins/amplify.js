import { Amplify, Auth } from 'aws-amplify'
import amplifyConfig from '@/aws-exports';

export default defineNuxtPlugin((nuxtApp) => {
    Amplify.configure(amplifyConfig);

    return {
        provide: {
            auth: Auth
        }
    }
})