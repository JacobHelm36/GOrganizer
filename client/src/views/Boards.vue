<template>
  <div class="boards bg-secondary" id="boardsVue">
    <div id="boardsVue">
      WELCOME TO THE BOARDS!!!
      <form @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required />
        <input type="text" placeholder="description" v-model="newBoard.description" />
        <button type="submit">Create Board</button>
      </form>
      <div class="row">
        <div v-for="board in boards" :key="board._id" :boardData="board">
          <div class="col">
            <div class="card mt-1 ml-2" style="width:100%">
              <router-link :to="{name: 'board', params: {boardId: board._id}}">
                <h3 class="card-top">{{board.title}}</h3>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>
<style scoped>
#boardsVue {
  height: 100vh;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>