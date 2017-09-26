import { Template } from 'meteor/templating';

import { Meteor   } from 'meteor/meteor';

 import { Cards } from '../api/cards.js';

 import { Blaze } from 'meteor/blaze'

 import './card.html';
 import './editCard.html'


 Template.card.events({

 'click .delete-card'(event) {
     event.preventDefault();
     Meteor.call('cards.remove',this._id);
   },

  'click .edit-card'(event) {
    $('#editWrapper').remove()
    event.preventDefault();

   const card   = event.target;
   const target = event.target.parentNode.parentNode.parentNode;
   const text   = Cards.findOne({_id: this._id}).text;

  Blaze.renderWithData(Template.editCard, {text: text, _id: this._id, column: this.column, createdAt: this.createdAt}, target);

   },
  });
