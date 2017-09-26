Meteor.startup(function() {

  // Accounts.createUser({
  //   username: "scotchio",
  //   email: "scotch@example.com",
  //   password: "dummypassword"
  // });


  if (Messages.find({}).count() === 0) {
    _(10).times(function(n) {
      Factory.create('message');
    });
  }

  // Channels.insert({
  //   name: "general"
  // });
  // Channels.insert({
  //   name: "random"
  // });
});
