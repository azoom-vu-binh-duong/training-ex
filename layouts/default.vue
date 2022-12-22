<template>
  <div class="default-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
<style lang="scss" scoped>
@import '~/assets/style/color.scss';
.default-layout {
  width: 100vw;
  height: 100vh;
  padding: 50px 0;
  background-color: $main-black;
  color: $main-orange;
}
</style>
                  