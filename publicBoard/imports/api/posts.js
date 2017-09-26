import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function tasksPublication() {
    return Posts.find({}, { sort: { createdAt: -1 } });
  });

  var Api =  new Restivus({
    useDefaultAuth: true,
    prettyJson:true,
  });

  Api.addCollection(Posts);
  Api.addCollection(Meteor.users, {
     excludedEndpoints: ['getAll', 'put'],
     routeOptions: {
       authRequired: true
     },
     endpoints: {
       post: {
         authRequired: false
       },
       delete: {
         roleRequired: 'admin'
       }
     }
   });
}

Meteor.methods({
 'posts.insert'(text) {
   check(text, String);

  if(! this.userId){
    throw new Meteor.Error('not-authorized');
  }

    Posts.insert({
      text,
      createdAt: new Date(),
      vote: 0,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

   'posts.voteup'(taskId){
     Posts.update(taskId, {
       $inc: { vote: 1 },
     });
   },

   'posts.votedown'(taskId){
     Posts.update(taskId, {
       $inc: { vote: -1 },
     });
   },
});
