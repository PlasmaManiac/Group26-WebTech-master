Meteor.methods({
  removeItem( event ) {
    check( event, String );

    try {
      return Items.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
