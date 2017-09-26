import { Template } from 'meteor/templating';
import { Posts    } from '../api/posts.js';
import { Meteor   } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';

import './body.html';
import './post.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('posts');
});

Template.body.helpers({
  posts() {
    const instance = Template.instance();
    // Otherwise, return all of the tasks
    return Posts.find({}, { sort: { vote: -1 } });
  },
});

Template.body.events({
  'submit .new-task'  (event){
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call('posts.insert',text);

    target.text.value = '';
  },
})
