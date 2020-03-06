<template>
  <!-- this is where tasks would show up 50% of the time -->
  <div
    class="list m-2"
    droppable="true"
    v-on:drop.capture="dropTask"
    ondragover="event.preventDefault()"
  >
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
          <add-task :listId="listData.id" />
        </div>
      </div>
    </div>
  </div>
  <!-- add a sweetalert to the delete function -->
</template>

<script>
import Task from "./Task";
import addTask from "./AddTask";
export default {
  mounted() {
    this.$store.dispatch("getTasks", this.listData._id);
  },
  data() {
    return {
      title: this.listData.title,
      listID: this.listData._id
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData._id];
    }
  },
  props: ["listData"],
  components: {
    Task,
    addTask
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
    },
    dropTask(event) {
      //get the item off of the event storage
      let task = JSON.parse(event.dataTransfer.getData("data"));
      //get the starting location off of the event storage
      let from = event.dataTransfer.getData("from");
      //add the item to the room's items

      let data = {
        from: from,
        listId: this.listData._id,
        task: task
      };

      if (data.listId != from) {
        this.$store.dispatch("changeTaskListId", data);
        //otherwise remove it from its previous room
        this.$store.commit("transferTask", data);
      }
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
  width: 17rem;
}
.card {
  border-radius: 3%;
}
</style>