import Branches from '@/api/branches';
import Policies from '@/api/policies';
import Roles from '@/api/roles';
import Users from '@/api/users';


export default defineNuxtPlugin(() => {
    const api = {
        branches: Branches(),
        policies: Policies(),
        roles: Roles(),
        users: Users(),
    };
    return {
        provide: {
            api,
        }
    }
})