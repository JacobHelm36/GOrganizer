<template>
  <!-- this is where tasks would show up 50% of the time -->
  <div class="col-12 col-md-4 m-2">
    <div class="card bg-primary text-white">
      <h1 class="card-top">{{listData.title}}</h1>
      <h3 class="mt-2">
        Tasks:
        <!-- @click="addList" -->
      </h3>
      <div class="row">
        <div class="col-12">
          <task class="card-body" v-for="taskObj in tasks" :key="taskObj._id" :taskData="taskObj" />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12">
          <button class="btn btn-danger btn-fixer">Delete List</button>
          <button class="btn btn-warning btn-fixer">Edit List</button>
        </div>
      </div>
    </div>
  </div>
  <!-- the delete button functionality @click="deleteList" -->
  <!-- the edit button functionality @click="editList" -->
</template>

<script>
import Task from "./Task";
export default {
  mounted() {
    this.$store.dispatch("getTasks", this.listData._id);
    console.log(this.$store.state.tasks);
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
    editList() {
      this.$store.dispatch("editListById", this.listData._id);
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
</style>