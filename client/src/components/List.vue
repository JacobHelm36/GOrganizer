<template>
  <!-- this is where tasks would show up 50% of the time -->
  <div class="m-2 list">
    <div class="card bg-light py-3">
      <strong
        class="card-top"
        contenteditable
        @blur="titleEdit"
        @keydown.enter="titleEdit"
      >{{title}}</strong>
      <br />
      <div class="row">
        <div class="col-12">
          <task v-for="taskObj in tasks" :key="taskObj._id" :taskData="taskObj" />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12">
          <button class="btn btn-danger btn-fixer" @click="deleteList">Delete List</button>
          <button class="btn btn-primary" @click="createTask">+</button>
        </div>
      </div>
    </div>
  </div>
  <!-- the edit button functionality @click="editList" -->
</template>

<script>
import Task from "./Task";
export default {
  mounted() {
    this.$store.dispatch("getTasks", this.listData._id);
  },
  data() {
    return {
      title: this.listData.title
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData._id];
    }
  },
  props: ["listData"],
  components: {
    Task
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", this.listData._id);
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listData._id);
    },
    titleEdit(evt) {
      let newTitle = evt.target.innerText;
      this.title = newTitle;
      let data = {
        title: newTitle,
        id: this.listData._id
      };
      this.$store.dispatch("editListById", data);
      console.log(this.listData._id);
    },
    createTask(){
      this.$store.dispatch("createTask", this.taskObj.title)
    }
  }
};
</script>

<style scoped>
.btn-fixer {
  margin: 2px 1px 2px 1px;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
}
.list {
  width: 15rem;
}
.card {
  border-radius: 3%;
}
</style>