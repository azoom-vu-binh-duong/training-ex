<template>
  <div class="index-page">
    <div class="content-container">
      <h3 id="title">List Posts</h3>
      <div class="content">
        <div class="header">
          <button
            class="btn add-btn"
            @click="toggleFormVisible"
          >Add New Post</button>
          <button
            class="btn back-btn"
            @click.prevent="$router.go(-1)"
          >Back</button>
        </div>

        <div class="list-post">
          <post-article
            v-for="post in showedPosts"
            :key="post.id"
            :post="post"
          />
        </div>

        <div class="footer">
          <base-paginator
            :total-pages="totalPages"
            :total="totalPosts"
            :per-page="perPage"
            :current-page="currentPage"
            :has-more-pages="hasMorePages"
            @pagechanged="showMore"
          />
        </div>
      </div>
    </div>

    <div
      v-if="formVisible"
      class="form-container"
    >
      <base-form
        :action="addPost"
        @toggleFormVisible="toggleFormVisible()"
      />
    </div>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'
export default {
  data() {
    return {
      formVisible: false,
      page: 1,
      perPage: 12,
      currentPage: 1,
    }
  },
  computed: {
    ...get('*'),
    totalPosts() {
      return this.posts.length
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.perPage)
    },
    showedPosts() {
      const start = (this.currentPage - 1) * this.perPage
      return this.posts.slice(start, start + this.perPage)
    },
    hasMorePages() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    toggleFormVisible() {
      this.formVisible = !this.formVisible
    },
    showMore(page) {
      this.page = page
      this.currentPage = page
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/style/color';
.content-container {
  width: 900px;
  margin: auto;
  > #title {
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 500;
    text-transform: uppercase;
  }

  > .content {
    height: auto;
    border: 1px solid $main-orange;
    border-radius: 10px;
    padding: 20px 50px;
    background-color: transparent;
    overflow-x: scroll;
  }
}

.content {
  > .header {
    > .add-btn {
      margin: 10px 10px 20px 0;
    }

    > .back-btn {
      width: 100px
    }
  }

  > .footer {
    margin: 25px 0 15px 0;
  }
}

.form-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>