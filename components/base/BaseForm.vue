<template>
  <div class="post-update-form">
    <div class="header">
      <v-btn
        icon
        @click="$emit('toggleFormVisible')"
      >
        <v-icon style="color: red">mdi-close</v-icon>
      </v-btn>
    </div>
    <form class="post-form">
      <label
        for="title"
        class="label"
      >Title: </label>
      <v-text-field
        id="title"
        v-model="newPost.title"
        class="input"
        solo
      ></v-text-field>
      <label
        for="body"
        class="label"
      >Body: </label>
      <v-textarea
        id="body"
        v-model="newPost.body"
        class="input"
        solo
      ></v-textarea>
      <v-btn
        elevation="2"
        @click.prevent="handleAction()"
      >{{ btnText }}</v-btn>
    </form>
  </div>
</template>
      
    <script>
import { call } from 'vuex-pathify'
export default {
  props: {
    post: {
      type: Object,
      default: () => ({
        title: '',
        body: '',
      }),
    },
    action: {
      type: String,
      default: 'addPost',
    },
  },
  data() {
    return {
      newPost: this.post,
      actionName: this.action,
    }
  },
  computed: {
    btnText() {
      if (this.actionName === 'addPost') return 'Add Post'
      if (this.actionName === 'updatePost') return 'Update Post'
      return 'Nothing'
    },
  },
  methods: {
    addNewPost: call('addPost'),
    updatePost: call('updatePost'),
    handleAction() {
      console.log(this.actionName)
      if (this.actionName === 'addPost') this.addNewPost(this.newPost)
      if (this.actionName === 'updatePost') this.updatePost(this.newPost)
      this.$emit('toggleFormVisible')
    },
  },
}
</script>
  <style scoped lang="scss">
.post-update-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: auto;
  padding: 10px 30px 30px 30px;
  background-color: #fff;
  color: #000;
  z-index: 999;

  > .header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}

.post-form {
  > .label {
    display: block;
    margin-bottom: 10px;
  }
  > .input {
    padding: 0;
  }
}
</style>