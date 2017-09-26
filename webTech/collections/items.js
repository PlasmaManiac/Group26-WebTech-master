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
    allowedValues: [ 'Deadline', 'Request','Meeting', 'Birthday', 'Miscellaneous' ]
  },
  'description': {
    type: String,
    label: 'The description of an event.'
  },
  'ID': {
    type: String,
    label: 'User ID.'
  }
});

Items.attachSchema( ItemsSchema );
