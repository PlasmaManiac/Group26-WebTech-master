Meteor.methods({
  addItem( event ) {
    check( event, {
      title: String,
      start: String,
      end: String,
      type: String,
      guests: Number
    });

    try {
      return Items.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
