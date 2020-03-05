<template>
  <div class="component">
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      :data-target="'#task-creator'+listId"
    >create task</button>
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      :id="'task-creator'+listId"
      @submit.prevent="createTask"
    >
      <div class="modal-dialog" role="document">
        <form action>
          <div class="modal-content form-group rounded input-group-default">
            <div class="modal-header d-flex flex-column">
              <h2>Task</h2>
              <input
                class="modal-title rounded form-control"
                :placeholder="listId"
                aria-describedby="inputGroup-sizing-default"
                v-model="newTask.title"
              />
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                data-toggle="modal"
                :data-target="'#task-creator'+listId"
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
export default {
  mounted() {},
  name: "AddTask",
  data() {
    return {
      newTask: {
        listId: this.listId
      }
    };
  },
  computed: {},
  methods: {
    createTask() {
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