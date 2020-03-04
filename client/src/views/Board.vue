<template>
  <div class="board">
      <h1 v-if="board">{{board.title}}</h1>
      <h1 v-else>Loading...</h1>
      <button class="btn btn-success btn-sm btn-fixer">Add list</button>
    <!-- import lists -->
    <div class="row">
      <list v-for="listObj in lists" :key="listObj._id" :listData="listObj" />
    </div>
  </div>
</template>
<script>
// set active board here, get route params here
import List from "../components/List";
export default {
  name: "board",
  mounted() {
    {
      this.$store.dispatch("getLists", this.$route.params.boardId);
      this.$store.dispatch("setActiveBoard", this.$route.params.boardId);
    }
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    deleteBoard() {
      console.log(req.params.boardId);
      this.$store.dispatch("deleteBoardById", req.params.boardId);
    },
    editBoard() {
      console.log(this.boards.id);
      this.$store.dispatch("editBoard", this.boardId);
    }
  },
  props: [],
  components: {
    List
  }
};
</script>
<style>

</style>
