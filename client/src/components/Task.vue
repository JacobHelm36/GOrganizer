<template>
  <div class="col-12 task">
    <div class="bg-primary text-white" @click="toggleComments">
      <p class="px-2 task-content">
        <strong>{{taskData.title}}</strong>
        <i class="far fa-minus-square text-white" @click="removeTask"></i>
      </p>
    </div>
    <div
      class="comments-drop"
      v-if="showComments"
      v-for="comment in taskData.comments"
      :key="comment._id"
    >
      <p>{{comment.body}}</p>
      <i>{{comment.author}}</i>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"],
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    removeTask() {
      let data = {
        listId: this.taskData.listId,
        id: this.taskData._id
      };
      this.$store.dispatch("deleteTask", data);
    }
  },
  data() {
    return {
      showComments: true
    };
  }
};
</script>

<style>
.task-content {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.task-content i {
  display: none;
}
.task-content:hover i {
  display: block;
}
</style>