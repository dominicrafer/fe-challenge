import Businesses from '@/api/businesses';
import Banks from '@/api/banks';
import Policies from '@/api/policies';
import Roles from '@/api/roles';
import Users from '@/api/users';
import Customers from '@/api/customers';
import Projects from '@/api/projects';


export default defineNuxtPlugin(() => {
    const api = {
        businesses: Businesses(),
        banks: Banks(),
        policies: Policies(),
        roles: Roles(),
        users: Users(),
        customers: Customers(),
        projects: Projects()
    };
    return {
        provide: {
            api,
        }
    }
})