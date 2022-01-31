import TaskColl from "../collections/TaskColl";

Meteor.publish('tasks', function publishTasks() {
    return TaskColl.find({userId: this.userId});
});