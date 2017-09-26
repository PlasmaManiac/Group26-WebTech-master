FlowRouter.route('/app', {
    name: 'app',
    action: function() {
    BlazeLayout.render('app');
  }
});

FlowRouter.route('/', {
  triggersEnter: function(context, redirect) {
      redirect('/app/general');
    },
});

FlowRouter.route('/app/:channel', {
  triggersEnter: function(context) {
    Session.set('channel', context.params.channel);
  },
  action: function() {
    BlazeLayout.render('app', {message_history: 'messages'});
  }
});

FlowRouter.route('/publicBoard', {
    name: 'publicBoard',
    action() {
    console.log("publicBoard");
    BlazeLayout.render('publicBoard');
  }
});

FlowRouter.route('/calendar', {
    name: 'calendar',
    action() {
    console.log("calendar");
    BlazeLayout.render('items');
  }
});
