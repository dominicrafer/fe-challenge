<template>
<div class="test">
  <span class="test__span">test</span>
</div>
  
</template>

<script>
export default {
  setup() {
    console.log('TEST?')
  }
}
</script>

<style lang="postcss" scoped>
.test {
  @apply bg-gray-400 p-[32px];
  &__span {
    @apply text-blue-400;
  }
}
</style>