import Vuex from 'vuex'
import pathify, { make } from 'vuex-pathify'
import ky from 'ky'

const state = () => ({
    posts: [],
})

const getters = {
    ...make.getters(state),
    getPostById: state => id => {
        const idInt = parseInt(id)
        return state.posts.find(post => post.id === idInt)
    }
}

const mutations = {
    ...make.mutations(state),

    ADD_POST(state, post) {
        const postsLength = state.posts.length
        const id = postsLength + 1
        const userId = Math.ceil(postsLength / 10)
        const newPost = { ...post, id, userId }
        state.posts = [newPost, ...state.posts]
    },
    UPDATE_POST(state, newPost) {
        state.posts = state.posts.map(
            post => post.id === newPost.id ?
                { ...post, title: newPost.title, body: newPost.body } : post
        )
    },
    DELETE_POST(state, id) {
        state.posts = state.posts.filter(post => post.id !== id)
    },
}

const actions = {
    async nuxtClientInit({ commit }) {
        const fetchPosts = await ky
            .get('https://jsonplaceholder.typicode.com/posts')
            .json()
        commit('SET_POSTS', fetchPosts)
    },
    addPost({ commit }, newPost) {
        commit('ADD_POST', newPost)
    },
    updatePost({ commit }, newPost) {
        commit('UPDATE_POST', newPost)
    },
    deletePost({ commit }, id) {
        commit('DELETE_POST', id)
    },
}

export default () =>
    new Vuex.Store({
        plugins: [pathify.plugin],
        state,
        getters,
        mutations,
        actions,
    })

