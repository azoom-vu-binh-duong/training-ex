<template>
  <nuxt-link :to="`/posts/${post.id}`">
    <div class="post-article">
      <h5 id="title">{{ post.title }}</h5>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
}
</script>

<style scoped lang="scss">
.post-article {
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
  }

  > #title {
    font-size: 17px;
    font-weight: 500;
    text-transform: capitalize;
  }
}
</style>