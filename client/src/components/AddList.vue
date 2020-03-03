<template>
  <div class="component">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#post-creator">create list</button>
    <div class="modal" tabindex="-1" role="dialog" id="post-creator" @submit.prevent="createList">
      <div class="modal-dialog" role="document">
        <form action="">
        <div class="modal-content form-group rounded input-group-default">
          <div class="modal-header d-flex flex-column">
            <h2>Title</h2>
            <input class="modal-title rounded form-control" placeholder="List title..." aria-describedby="inputGroup-sizing-default" v-model="newList.title"/>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#post-creator">Submit</button>
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
  name: 'AddList',
  data(){
    return {
      newList:{}
    }
  },
  computed:{

  },
  methods:{
    createList(){
      this.$store.dispatch("addList", this.newList)
    }
  },
  components:{

  }
}
</script>