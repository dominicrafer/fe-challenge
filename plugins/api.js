import Branches from '@/api/branches';
import Policies from '@/api/policies';
import Roles from '@/api/roles';


export default defineNuxtPlugin(() => {
    const api = {
        branches: Branches(),
        policies: Policies(),
        roles: Roles(),
    };
    return {
        provide: {
            api,
        }
    }
})