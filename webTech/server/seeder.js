Meteor.startup(function() {
  Channels.remove({
    name:"general"
  });
  Channels.insert({
    name: "general"
  });
});
