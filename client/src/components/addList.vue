<template>
  <div class="component">
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#list-creator"
    >create list</button>
    <div class="modal" tabindex="-1" role="dialog" id="list-creator" @submit.prevent="createList">
      <div class="modal-dialog" role="document">
        <form action>
          <div class="modal-content form-group rounded input-group-default">
            <div class="modal-header d-flex flex-column">
              <h2>Title</h2>
              <input
                class="modal-title rounded form-control"
                placeholder="What's next?"
                aria-describedby="inputGroup-sizing-default"
                v-model="newList.title"
              />
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#list-creator"
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
import boardId from "../views/Board";
export default {
  mounted() {
    console.log(this.newList);
  },
  name: "AddList",
  data() {
    return {
      newList: {
        boardId: this.boardId
      }
    };
  },
  computed: {},
  methods: {
    createList() {
      this.$store.dispatch("createList", this.newList);
    }
  },
  props: ["boardId"],
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