import Employee from "@/api/employee";

export default defineNuxtPlugin(() => {
  const api = {
    employee: Employee()
  };
  return {
    provide: {
      api
    }
  };
});
