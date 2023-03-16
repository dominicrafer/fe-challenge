import Branches from '@/api/branches';
import Policies from '@/api/policies';


export default defineNuxtPlugin(() => {
    const api = {
        branches: Branches(),
        policies: Policies(),
    };
    return {
        provide: {
            api,
        }
    }
})