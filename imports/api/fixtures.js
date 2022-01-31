import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import TaskColl from "./collections/TaskColl";

const insertTask = (taskText, user) => TaskColl.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date()
});
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';


Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD
        });
    }
    const user = Accounts.findUserByUsername(SEED_USERNAME);


    if (TaskColl.find().count() === 0) {
        [
            'First Task',
            'Second Task',
            'Third Task',
            'Fourth Task',
            'Fifth Task',
            'Sixth Task',
            'Seventh Task'
        ].forEach(insertTask)
    }
});