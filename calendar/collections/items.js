Items = new Mongo.Collection( 'items' );

Items.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Items.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let ItemsSchema = new SimpleSchema({
  'title': {
    type: String,
    label: 'The title of this item.'
  },
  'start': {
    type: String,
    label: 'When this item will start.'
  },
  'end': {
    type: String,
    label: 'When this item will end.'
  },
  'type': {
    type: String,
    label: 'What type of item is this?',
    allowedValues: [ 'Birthday', 'Corporate', 'Wedding', 'Miscellaneous' ]
  },
  'guests': {
    type: Number,
    label: 'The number of guests expected at this item.'
  }
});

Items.attachSchema( ItemsSchema );
