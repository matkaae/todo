import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    Tasks.insert({
      text,
      createdAt: new Date(),
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);



    if(setChecked == true)
    {
        var data = {
            checked: setChecked,
            finishedAt: new Date()
        }

        var o = { $set: data };
     }
     else
     {
         var data = {
             checked: setChecked
         }

         var o = {
             $set: data,
             $unset: { finishedAt: "" }
        };
     }


    Tasks.update(taskId, o);
  },
});
