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
  @apply flex flex-col justify-center w-screen h-screen bg-no-repeat bg-cover;
  @apply bg-[#2593cc];
  @apply pl-[10%] pr-[60%];
}

@media screen and (max-width: 768px) {
  .login-layout {
    @apply pl-[5%] pr-[25%];
  }
}
</style>