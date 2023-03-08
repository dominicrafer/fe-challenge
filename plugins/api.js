import Branches from '@/api/branches';


export default defineNuxtPlugin(() => {
    const api = {
        branches: Branches(),
    };
    return {
        provide: {
            api,
        }
    }
})