<template>
<form class="new-task" @submit.prevent="handleSubmit">
  <input v-model="newTask" type="text" placeholder="Type to add a new task"/>
  <button type="submit">Add Task</button>
</form>
</template>

<script>
export default {
  name: "TaskForm",
  data() {
    return {
      newTask:''
    }
  },
  methods: {
    handleSubmit(event) {
      if (this.newTask.length === 0) return;
      Meteor.call('task.insert', this.newTask.trim());
      // Clear Form
      this.newTask = '';
    }
  }
}
</script>

<style scoped>
.new-task {
  margin-top: 1rem;
}
</style>