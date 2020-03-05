<template>
  <div class="component">
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#task-creator"
    >create task</button>
    <div class="modal" tabindex="-1" role="dialog" id="task-creator" @submit.prevent="createTask">
      <div class="modal-dialog" role="document">
        <form action>
          <div class="modal-content form-group rounded input-group-default">
            <div class="modal-header d-flex flex-column">
              <h2>Task</h2>
              <input
                class="modal-title rounded form-control"
                placeholder="What tasks do you have?"
                aria-describedby="inputGroup-sizing-default"
                v-model="newTask.title"
              />
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#task-creator"
              >Submit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import listId from "../components/List";
export default {
  mounted() {
    console.log(this.newTask.listsId);
  },
  name: "AddTask",
  data() {
    return {
      newTask: {
        listsId: this.listId,
        //possibly creator email
      }
    };
  },
  computed: {},
  methods: {
    createTask() {
      console.log(this.newTask.title)
      console.log(this.newTask.listsId)
      this.$store.dispatch("createTask", this.newTask);
    }
  },
  props: ["listId"],
  components: {}
};
</script>


<style scoped>
div.modal-content {
  background-color: #f7f4f3;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>