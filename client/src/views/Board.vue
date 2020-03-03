<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <button>Delete</button>
  </div>
</template>
<script>
// set active board here, get route params here
export default {
  name: "board",
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    }
  },
  methods: {
    deleteBoard() {
      console.log(req.params.boardId)
      this.$store.dispatch("deleteBoardById", req.params.boardId)
    },
    editBoard() {
      console.log(this.boards.id)
      this.$store.dispatch("editBoard", this.boardId);
    }
  },
  props: ["boardId"]
};
</script>
