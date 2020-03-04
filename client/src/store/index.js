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
    tasks: {}
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
    editBoard(state, boardEdit) {
      state.activeBoard = boardEdit
    },
    setLists(state, lists) {
      state.lists = lists;
    },
    createList(state, lists) {
      state.lists.push(lists)
    },
    deleteList(state, listId) {
      state.lists = state.lists.filter(el => el._id != listId)
    },
    setTasks(state, data) {
      Vue.set(state.tasks, data.listId, data.resData);
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
    async editBoardById({commit, dispatch}, boardId){
      let res = await api.put(`boards/${boardId}`)
      commit("editBoard", res.data)
    },
    async deleteBoardById({ commit}, boardId) {
      let res = await api.delete(`boards/${boardId}`)
      router.push({ name: "boards" })
      return res
    },
    async getLists({ commit, dispatch }, boardId) {
      let res = await api.get(`boards/${boardId}/lists`)
      commit('setLists', res.data)
    },
    async createList({ commit, dispatch }, newList) {
      let res = await api.post(`/boards/${newList.boardId}`)
      commit ("addList", newList)
    },
    async deleteList({ commit }, listId) {
      let res = await api.delete(`lists/${listId}`)
      commit("deleteList", listId)
      return res
    },
    // check this action
    async editListById({ commit }, listId) {
      let res = await api.put(`lists/${listId}`)
      let newList = await api.get(`/lists/${listId}`)
      commit("setLists")
    },
    async getTasks({ commit, dispatch }, listId) {
      let res = await api.get(`lists/${listId}/tasks`)
      let data = {
        listId: listId,
        resData: res.data
      }
      commit("setTasks", data)
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
