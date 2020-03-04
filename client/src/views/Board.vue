<template>
  <div class="board">
      <h1 v-if="board">{{board.title}}<span>
        <div class="dropdown">
        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Options
        </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#"></a>
            <a class="dropdown-item">Edit Board</a>
            <a class="dropdown-item" @click="deleteBoard">Delete Board</a>
          </div>
        </div>
        </span></h1>
      <h1 v-else>Loading...</h1>
      <add-list :boardId="this.$route.params.boardId"/>
    <!-- import lists -->
    <div class="lists">
      <list v-for="listObj in lists" :key="listObj._id" :listData="listObj" />
    </div>
  </div>
</template>
<script>
// set active board here, get route params here
import List from "../components/List";
import addList from "../components/addList"
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
      this.$store.dispatch("deleteBoardById", this.$route.params.boardId);
    },
    editBoard() {
      this.$store.dispatch("editBoardById", this.$route.params.boardId);
    }
  },
  props: [],
  components: {
    List,
    addList
  }
};
</script>
<style>
.lists {
  display: flex;
  overflow-x: scroll;
  flex-direction: row;
}
</style>
