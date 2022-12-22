<template>
    <div class="gray-layout">
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
  .gray-layout {
    width: 100vw;
    height: 100vh;
    padding: 50px 0;
    background-color: $main-gray;
    color: $main-orange;
  }
  </style>
    