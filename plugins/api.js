import Businesses from '@/api/businesses';
import Policies from '@/api/policies';
import Roles from '@/api/roles';
import Users from '@/api/users';


export default defineNuxtPlugin(() => {
    const api = {
        businesses: Businesses(),
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