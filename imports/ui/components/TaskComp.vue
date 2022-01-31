<template>
<li v-bind:class="taskClassName">
  <input v-bind:checked="!!this.task.checked" @click="toggleChecked" type="checkbox" readonly/>
  <span class="text">{{ this.task.text }}</span>
  <button class="delete" @click="deleteThisTask">X</button>
</li>
</template>

<script>
export default {
  name: "TaskComp",
  props: ["task"],
  computed: {
    taskClassName: function() {
      return this.task.checked ? "checked":"";
    }
  },
  methods: {
    toggleChecked() {
      // Set the checked property to the opposite of its current value
      Meteor.call('task.setChecked', this.task._id, !this.task.checked);
    },
    deleteThisTask() {
      Meteor.call('task.remove', this.task._id);
    }
  }
}
</script>

<style scoped>

</style>