<template>
  <div class="col-12">
    <h2 class="bg-info">{{taskData.title}}</h2>
    <div class="bg-light text-dark" v-for="comment in taskData.comments" :key="comment._id">
      <p>{{comment.body}}</p>
      <i>{{comment.author}}</i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["taskData"]
};
</script>

<style>
</style>