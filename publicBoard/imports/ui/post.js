import { Template } from 'meteor/templating';
import { Meteor   } from 'meteor/meteor';

import './post.html';

Template.post.events({
  'click .vote-up'(){
    // Set the checked property to the opposite of its current value
    Meteor.call('posts.voteup', this._id)
  },

  'click .vote-down'(){
    // Set the checked property to the opposite of its current value
      Meteor.call('posts.votedown', this._id);
  },
});
