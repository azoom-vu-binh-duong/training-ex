<template>
  <div class="content-container">
    <h3 id="title">Post Details</h3>
    <div class="content">
      <div class="post-detail">
        <div class="item">
          <label>Title: </label>
          <strong>{{ post.title }}</strong>
        </div>
        <div class="item">
          <label>ID: </label>
          <span>{{ post.id }}</span>
        </div>
        <div class="item">
          <label>Post by: </label>
          <span>{{ post.userId }}</span>
        </div>
        <div class="item">
          <label>Body: </label>
          <p>{{ post.body }}</p>
        </div>
      </div>
      <div class="card-footer">
        <div class="left">
          <button
            class="btn back-btn"
            @click="$router.go(-1)"
          >Back</button>
        </div>
        <div class="right">
          <button
            class="btn -left"
            @click="toggleFormVisible()"
          >Update</button>
          <button
            class="btn"
            @click="handleDelete()"
          >Delete</button>
        </div>
      </div>
    </div>
    <div
      v-if="formVisible"
      class="form-container"
    >
      <base-form
        :action="updatePost"
        :post="post"
        @toggleFormVisible="toggleFormVisible()"
      />
    </div>
  </div>
</template>

<script>
import { call } from 'vuex-pathify'
export default {
  data() {
    return {
      formVisible: false,
    }
  },
  computed: {
    post() {
      return this.$store.getters.getPostById(this.$route.params.id)
    },
  },
  methods: {
    deletePost: call('deletePost'),
    async handleDelete() {
      if (confirm('You serious?')) {
        await this.deletePost(this.post.id)
        alert('Delete successfully!')
        this.$router.push('/posts')
      }
    },
    toggleFormVisible() {
      this.formVisible = !this.formVisible
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/style/color';
.content-container {
  width: 700px;
  margin: auto;
  > #title {
    margin: 100px 0 20px 0;
    font-size: 30px;
    font-weight: 500;
    text-transform: uppercase;
  }

  > .content {
    height: auto;
    margin: auto;
    border: 1px solid $main-orange;
    border-radius: 10px;
    padding: 20px 50px;
    background-color: transparent;
    overflow-x: scroll;
  }
}

.post-detail {
  margin-bottom: 15px;
  > .item {
    margin: 5px 0;
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  > .right {
    > .-left {
      margin-right: 10px;
    }
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