<template>
  <div class="col-12 task">
    <div class="bg-primary text-white" @click="toggleComments">
      <p class="px-2 task-content">
        <strong>{{taskData.title}}</strong>
        <i class="far fa-minus-square text-white" @click="removeTask"></i>
      </p>
    </div>
    <div class="comments-drop" v-if="showComments">
      <form>
      <input v-model="commentTitle"/><i class="far fa-plus-square" @click.prevent="addComment"></i>
      </form>
      <div
        v-for="comment in taskData.comments"
        :key="comment._id"
      >
        <p>{{comment.body}}</p>
        <i>{{comment.author}}</i>
        <br />
      </div>
    </div>
  </div>
  <!-- draggable=true v-on:dragstart.capture="moving" v-on:dragend="dropped" -->
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"],
  mounted(){
    let newComment = {}
  },
  data(){
    return {
    }
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
      console.log(this.newComment.taskId)
    },
    removeTask() {
      let data = {
        listId: this.taskData.listId,
        id: this.taskData._id
      };
      this.$store.dispatch("deleteTask", data);
    },
    addComment(){
      newComment={
        title: this.commentTitle,
        taskId: this.taskData.id,
        listId: this.taskData.listId
      }
      console.log(newComment)
      debugger
      this.$store.dispatch("addComment", newComment)
    }
  },
  data() {
    return {
      showComments: false
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