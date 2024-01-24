import Policies from '@/api/policies';
import Roles from '@/api/roles';
import Users from '@/api/users';
import MyModule from '@/api/my-module'

export default defineNuxtPlugin(() => {
    const api = {
        policies: Policies(),
        roles: Roles(),
        users: Users(),
        myModule: MyModule(),
    };
    return {
        provide: {
            api,
        }
    }
})