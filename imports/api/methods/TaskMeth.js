import {check} from 'meteor/check';
import TaskColl from "../collections/TaskColl";

Meteor.methods({
    'task.insert'(text) {
        check(text, String);
        if (!this.userId) {
            throw new Meteor.Error('Not Authorized!');
        }
        TaskColl.insert({
            text,
            createdAt: new Date(),
            userId: this.userId
        })
    },
    'task.remove'(taskId) {
        check(taskId, String);
        if (!this.userId) {
            throw new Meteor.Error('Not Authorized!');
        }
        const task = TaskColl.findOne({_id: taskId, userId: this.userId});
        if (!task) {
            throw new Meteor.Error('Access Denied!')
        }
        TaskColl.remove(taskId);
    },
    'task.setChecked'(taskId, checked) {
        check(taskId, String);
        check(checked, Boolean);
        if (!this.userId) {
            throw new Meteor.Error('Not Authorized!');
        }
        const task = TaskColl.findOne({_id: taskId, userId: this.userId});
        if (!task) {
            throw new Meteor.Error('Access Denied!')
        }
        TaskColl.update(taskId, {
            $set: {
                checked
            }
        })
    }
})