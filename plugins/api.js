import Businesses from '@/api/businesses';
import Policies from '@/api/policies';
import Roles from '@/api/roles';


export default defineNuxtPlugin(() => {
    const api = {
        businesses: Businesses(),
        policies: Policies(),
        roles: Roles(),
    };
    return {
        provide: {
            api,
        }
    }
})