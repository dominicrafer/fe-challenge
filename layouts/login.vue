<template>
  <div class="login-layout">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.login-layout {
  @apply flex flex-col justify-center items-center w-screen h-screen bg-no-repeat bg-cover;
  @apply bg-gainsboro;
}

</style>