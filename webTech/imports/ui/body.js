import { Template } from 'meteor/templating';
import { Cards    } from '../api/cards.js';
import { Columns  } from '../api/columns.js';
import { Meteor   } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';

import './card.js';
import './body.html';
import './card.html';
import './column.html';
import './column.js';

  Template.publicBoard.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('cards');
    Meteor.subscribe('columns');
  });

 Template.publicBoard.helpers({
    cards1() {
      return Cards.find({column: "one" });
     },

    cards2() {
      return Cards.find({column: "two" });
    },

    cards3() {
      return Cards.find({column: "three" });
    },

    cards4() {
      return Cards.find({column: "four" });
    },

    column1() {
      return Cards.find({columnTitle: "one"});
    },
    column2() {
      return Cards.find({columnTitle: "two"});
    },
    column3() {
      return Cards.find({columnTitle: "three"});
    },
    column4() {
      return Cards.find({columnTitle: "four"});
    },

 });


 Template.publicBoard.events({


  'click .edit-title'(event) {
     $(".temp-card-wrapper").remove()

    var location = event.target.parentNode.parentNode;
    var column = event.target.parentNode.parentNode.className;


    $(location).append($(
       '<div class="row temp-card-wrapper">'+
         '<div class="col s12 offset-1">'+
           '<div class="card blue-grey darken-3">'+
             '<div class="card-content white-text">'+
               '<div class="input-field inline">'+
                '<div class = '+ column +'>'+
                 '<p>'+
                   '<form class = "temp-card-title">'+
                   '<div class="input-field inline">'+
                     '<input id="content" type="text" name="content" class="validate">'+
                     '<label for="content"></label>'+
                   '</div>'+
                   '</form>'+
                 '</p>'+
              '</div'+
             '</div>'+
           '</div>'+
         '</div>'+
      '</div>')
    );

  },

  'click .new-card'(event) {


    var column = event.target.parentNode.parentNode.className;
    var location = event.target.parentNode.parentNode;

     $(".temp-card-wrapper").remove()
       event.preventDefault();

      $(location).prepend($(
         '<div class="row temp-card-wrapper">'+
           '<div class="col s12 offset-1">'+
             '<div class="card blue-grey darken-3">'+
               '<div class="card-content white-text">'+
                 '<div class="input-field inline">'+
                  '<div class = '+ column +'>'+
                   '<p>'+
                     '<form class = "temp-card">'+
                     '<div class="input-field inline">'+
                       '<input id="content" type="text" name="content" class="validate">'+
                       '<label for="content"></label>'+
                     '</div>'+
                     '</form>'+
                   '</p>'+
                '</div'+
               '</div>'+
             '</div>'+
           '</div>'+
        '</div>')
      );
  },

  'submit .temp-card-title'(event){
    event.preventDefault();
    const target = event.target;
    const column = event.target.parentNode.className;
    const text =  target.content.value;

    Meteor.call('cards.update.title',text,column);

     $(".temp-card-wrapper").remove()
  },

  'submit .temp-card'(event){
    event.preventDefault();

    const target = event.target;
    const text =  target.content.value;
    const title = target.title.value;

    const column = event.target.parentNode.className;

    Meteor.call('cards.insert',text,column);

     $(".temp-card-wrapper").remove()
   },

     'submit .edit-card-form'(event){
       event.preventDefault();

       const target = event.target;
       const text =  target.content.value;

      Meteor.call('cards.update',text,this._id,this.createdAt,this.column,this.owner,this.username);

      $('#editWrapper').remove();
    },

 });
