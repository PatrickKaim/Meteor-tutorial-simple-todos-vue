<template>
  <div class="app">
    <header>
      <div class="app-bar">
        <div class="app-header">
          <h1>
            Meteor To Do List!
            <span v-if="currentUser && incompleteCount > 0">({{ incompleteCount }})</span>
          </h1>
        </div>
      </div>
    </header>
    <div class="main">
      <template v-if="currentUser">
        <div class="user" v-on:click="logout">
          {{currentUser.username}} X
        </div>
        <TaskForm class="task-form"/>
        <div class="filter">
          <button v-model="hideCompleted" @click="toggleCompleted">
            <span v-if="hideCompleted">Show All</span>
            <span v-else>Hide Completed Tasks</span>
          </button>
        </div>
        <div class="loading" v-if="!this.$subReady.tasks">Loading ... </div>
        <ul class="tasks">
          <TaskComp v-for="task in tasks" v-bind:key="task._id" v-bind:task="task" class="task"/>
        </ul>
      </template>
      <template v-else>
        <LoginForm class="login-form" />
      </template>
    </div>
  </div>
</template>

<script>
import TaskComp from './components/TaskComp';
import TaskColl from "../api/collections/TaskColl";
import TaskForm from "./forms/TaskForm";
import LoginForm from "./forms/LoginForm";


export default {
  data() {
    return {
      hideCompleted: false
    }
  },
  components: {
    LoginForm,
    TaskForm,
    TaskComp
  },
  methods: {
    toggleCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    logout() {
      Meteor.logout();
    }
  },
  computed: {

  },
  meteor: {
    $subscribe: {
      'tasks': []
    },
    tasks() {
      if (!this.currentUser) {
        return []
      } else {
        const hideCompletedFilter = {checked: {$ne: true}};
        const userFilter = this.currentUser ? {userId: this.currentUser._id} : {};
        const pendingOnlyFilter = {...hideCompletedFilter, ...userFilter};

        return TaskColl.find(
            this.hideCompleted ? pendingOnlyFilter : userFilter, {
              sort: {createdAt: -1}
            }
        ).fetch();
      }
    },
    incompleteCount() {
      if (this.currentUser) {
        return TaskColl.find({checked: {$ne: true}, userId:this.currentUser._id}).count();
      } else {
        return 0
      }
    },
    currentUser() {
      return Meteor.user();
    }
  }
}
</script>

<style>
body {
  font-family: sans-serif;
  padding: 10px;
}
</style>