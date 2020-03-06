<template>
  <div class="col-12 task" draggable="true" v-on:dragstart.capture="moving" v-on:dragend="dropped">
    <div class="bg-primary text-white" @click="toggleComments">
      <p class="px-2 task-content">
        <strong>{{taskData.title}}</strong>
        <i class="far fa-minus-square text-white" @click="removeTask"></i>
      </p>
    </div>
    <div class="comments-drop row" v-if="showComments">
      <div class="comments-view col-12 mx-1">
        <div
          class="single-comment my-2 row"
          v-for="comment in taskData.comments"
          :key="comment._id"
        >
          <div class="col-9"></div>
          <i class="col fas fa-times delete-comment" @click="removeComment(comment._id)"></i>
          <p class="col-12">
            {{comment.body}}
            <br />
            <i class="signature">~ {{comment.creatorEmail}}</i>
          </p>
        </div>
      </div>
      <form @submit.prevent="createComment">
        <input class="col-9 my-3" type="text" placeholder="No comment?" v-model="newComment.body" />
        <button type="submit">
          <i class="fas fa-comment-alt text-primary"></i>
        </button>
      </form>
    </div>
  </div>
  <!-- draggable=true v-on:dragstart.capture="moving" v-on:dragend="dropped" -->
</template>

<script>
export default {
  name: "Task",
  mounted() {},
  data() {
    return {
      showComments: false,
      newComment: {
        taskId: this.taskData._id,
        listId: this.taskData.listId
      }
    };
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    removeTask() {
      let data = {
        listId: this.taskData.listId,
        id: this.taskData._id
      };
      this.$store.dispatch("removeTask", data);
    },
    createComment() {
      this.$store.dispatch("createComment", this.newComment);
    },
    removeComment(id) {
      let data = {
        _id: id,
        taskId: this.taskData._id,
        listId: this.taskData.listId
      };
      this.$store.dispatch("removeComment", data);
    },
    moving(event) {
      let from = this.taskData.listId;
      event.dataTransfer.setData("data", JSON.stringify(this.taskData));
      event.dataTransfer.setData("from", from);
      console.log("moving");
    },
    dropped() {
      console.log("the item has dropped");
    }
  },
  props: ["taskData"]
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
.comments-view {
  max-height: 13rem;
  overflow-y: auto;
}
.single-comment {
  background-color: rgb(241, 235, 235);
}
.signature {
  font-size: 12px;
}
.delete-comment {
  cursor: pointer;
}
</style>