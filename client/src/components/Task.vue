<template>
  <div class="col-12 task">
    <div class="bg-primary text-white">
      <p class="task-content px-2">
        <strong>{{taskData.title}}</strong>
        <i class="fas fa-edit"></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["taskData"]
};
</script>

<style>
.task-content {
  display: flex;
  justify-content: space-between;
}
.task-content i {
  display: none;
}
.task-content:hover i {
  display: block;
}
</style>