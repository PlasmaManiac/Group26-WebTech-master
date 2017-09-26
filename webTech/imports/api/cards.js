import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';


export const Cards = new Mongo.Collection('cards');

if (Meteor.isServer){
  Meteor.publish('cards',function taskPublication(){
    return Cards.find();
  });
  Meteor.startup(function() {

    Cards.remove({ columnTitle : "one"});
    Cards.remove({ columnTitle : "two"});
    Cards.remove({ columnTitle : "three"});
    Cards.remove({ columnTitle : "four"});

    Cards.insert({
     text : "This a new ",
     createdAt : new Date(),
     column : "title",
     columnTitle : "one",
     columnName : "Column One"
   });

   Cards.insert({
    text : "This a new ",
    createdAt : new Date(),
    column : "title",
    columnTitle : "two",
    columnName : "Column Two"
  });

  Cards.insert({
   text : "This a new ",
   createdAt : new Date(),
   column : "title",
   columnTitle : "three",
   columnName : "Column Three"
  });

  Cards.insert({
   text : "This a new ",
   createdAt : new Date(),
   column : "title",
   columnTitle : "four",
   columnName : "Column Four"
  });



  })

}

Meteor.methods({
  'cards.insert'(text,column){
    check(text,String);

    if(!this.userId){
      throw new Meteor.Error('not-authorized');
    }

    Cards.insert({
      text,
      createdAt: new Date(),
      column: column,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });

  },
  'cards.update'(text,_id,createdAt,column,owner,username){

    Cards.update(_id,{
    $set: { text: text },
    });

  },
  'cards.remove'(_id){
    Cards.remove({ _id: _id})
  },

  'cards.update.title'(text,column){

    Cards.update({columnTitle: column},
    {
      $set: {columnName: text}
    });

  },

});
