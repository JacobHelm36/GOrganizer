<template>
  <div class="col-12 col-md-4 bg-primary text-white m-2">
    <h1>{{listData.title}}</h1>
    <task v-for="taskObj in tasks" :key="taskObj._id" :taskData="taskObj" />
  </div>
</template>

<script>
import Task from "./Task";
export default {
  mounted() {
    this.$store.dispatch("getTasks", this.listData._id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  props: ["listData"],
  components: {
    Task
  }
};
</script>

<style>
</style>