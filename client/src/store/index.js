import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    setLists(state, lists) {
      state.lists = lists;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },

  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --

    async setActiveBoard({ commit }, boardId) {
      let res = await api.get(`boards/${boardId}`)
      commit("setActiveBoard", res.data)
    },
    async getBoards({ commit, dispatch }) {
      let res = await api.get('boards')
      commit('setBoards', res.data)
    },
    async getLists({ commit, dispatch }, boardId) {
      let res = await api.get(`boards/${boardId}/lists`)
      commit('setLists', res.data)
    },
    async deleteList({commit}, listId){
      let res = await api.delete(`lists/${listId}`)
      router.push({ name: "boards"})
      return res
    },
    // check this action
    async editListById({commit}, listId) {
      let res = await api.put(`lists/${listId}`)
      let newList = await api.get(`/lists/${listId}`)
      commit("setLists", )
    },
    async getTasks({ commit, dispatch }, listId) {
      let res = await api.get(`lists/${listId}/tasks`)
      commit("setTasks", res.data)
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    }
    //#endregion


    //#region -- LISTS --



    //#endregion
  }
})
