export default defineNuxtPlugin(() => {
  const api = {};
  return {
    provide: {
      api
    }
  };
});
