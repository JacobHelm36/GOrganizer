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
      state.lists = lists
    },
    editLists(state, list) {
      let oldList = state.lists.find(l => l._id == list.id);
      oldList = list
    },
    addList(state, lists) {
      state.lists.push(lists)
    },
    deleteList(state, listId) {
      state.lists = state.lists.filter(el => el._id != listId)
    },
    setTasks(state, data) {
      Vue.set(state.tasks, data.listId, data.resData);
    },
    addTasks(state, task) {
      state.tasks[task.listId].push(task)
    },
    removeTask(state, data) {
      let newArr = state.tasks[data.listId].filter(t => t.id != data.id);
      state.tasks[data.listId] = newArr;
    },
    // createComment(state, task) {
    //   let comment = task.comments.find(c => c._id == )
    //   let newcomment = {
    //     body: comment.body,
    //     creatorEmail: state.user.email
    //   }
    //   task.comments.push(newcomment)
    // },
    removeComment(state, comment) {
      let task = state.tasks[comment.listId].find(t => t._id == comment.taskId);
      task.comments = task.comments.filter(c => c._id != comment._id)
    },
    transferTask(state, data) {
      data.task.listId = data.listId;
      state.tasks[data.listId].push(data.task);
      state.tasks[data.from] = state.tasks[data.from].filter(t => t._id != data.task._id)
    }

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
    async editBoardById({ commit, dispatch }, boardId) {
      let res = await api.put(`boards/${boardId}`)
      commit("editBoard", res.data)
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async deleteBoardById({ commit }, boardId) {
      let res = await api.delete(`boards/${boardId}`)
      router.push({ name: "boards" })
      return res
    },
    // End of BOARDS

    // Start of LISTS
    async getLists({ commit, dispatch }, boardId) {
      let res = await api.get(`boards/${boardId}/lists`)
      commit('setLists', res.data)
    },
    async createList({ commit, dispatch }, newList) {
      let res = await api.post(`lists`, newList)
      commit("addList", res.data)
    },
    async deleteList({ commit }, listId) {
      let res = await api.delete(`lists/${listId}`)
      commit("deleteList", listId)
      return res
    },
    async editListById({ commit }, data) {
      let update = {
        title: data.title
      }
      let res = await api.put(`lists/${data.id}`, update)
      commit("editLists", res.data)
    },
    // End of LISTS

    // Start of TASKS
    async getTasks({ commit, dispatch }, listId) {
      let res = await api.get(`lists/${listId}/tasks`)
      let data = {
        listId: listId,
        resData: res.data
      }
      commit("setTasks", data)
    },
    async createTask({ commit, dispatch }, newTask) {
      let res = await api.post('tasks', newTask)
      commit("addTasks", res.data)
    },
    async removeTask({ commit, dispatch }, data) {
      let res = await api.delete(`tasks/${data.id}`)
      commit("removeTask", res.data)
    },
    // end of Tasks

    // Start of COMMENTS

    async createComment({ commit, dispatch }, newComment) {
      let data = {
        body: newComment.body
      }
      let res = await api.post(`tasks/${newComment.taskId}/comment`, data)

      // commit("createComment", res.data)
      dispatch("getTasks", res.data.listId)
    },

    async removeComment({ commit }, comment) {
      let res = await api.delete(`tasks/${comment.taskId}/comment/${comment._id}`);
      commit("removeComment", comment)
    },

    async changeTaskListId({ commit, dispatch }, data) {
      // debugger
      let res = await api.put(`tasks/${data.task._id}`, { listId: data.listId });
    }
    //#endregion


    //#region -- LISTS --



    //#endregion
  }
})
