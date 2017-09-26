import '../imports/api/cards.js';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish( 'items', function() { return Items.find(); } );
}


// Meteor.call methods to do things

Meteor.methods({
  addItem( event ) {
    check( event, {
      title: String,
      start: String,
      end: String,
      type: String,
      description: String,
      ID: String
    });

    try {
      return Items.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  removeItem( event ) {
    check( event, String );

    try {
      return Items.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  editItem( event ) {
    check( event, {
      _id: String,
      title: Match.Optional( String ),
      start: String,
      end: String,
      type: Match.Optional( String ),
      description: Match.Optional( String ),
      ID: String
    });

    try {
      return Items.update( event._id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  findItem(){
    return Items.find().fetch();
  }
});
