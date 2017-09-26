Template.messages.helpers({
  messages: Messages.find({})
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper('currentChannel', function () {
	return Session.get('channel');
});

Template.registerHelper("timestampToTime", function (timestamp) {
	var date = new Date(timestamp);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.registerHelper("usernameFromId", function (userId) {
	var user = Meteor.users.findOne({_id: userId});
	if (typeof user === "undefined") {
		return "Anonymous";
	}
	if (typeof user.services.github !== "undefined") {
		return user.services.github.username;
	}
	return user.username;
});

Template.listings.helpers({
	channels: function () {
		return Channels.find();
	}
});

Template.channel.helpers({
	active: function () {
		if (Session.get('channel') === this.name) {
			return "active";
		} else {
			return "";
		}
	}
});

Template.listings.events({
  'click .new-channel-btn' (event) {
    $('.temp-channel-form').remove()
    event.preventDefault();
    $(".channel_list").append($(
      '<div class="row temp-channel-form">' +
        '<div class="card white">' +
          '<div class="input-field inline">' +
            '<p>' +
              '<form class="temp-channel">' +
                '<div class="input-field inline">'+
                  '<input type="text" class="validate" id="content" name="Name">' +
                    '<label for="Name">Channel Name </label>' +
                '</div>' +
              '</form>' +
            '</p>' +
          '</div>' +
        '</div>' +
      '</div>')
    );
  },

  'submit .temp-channel' (event) {
      event.preventDefault();
      const target = event.target;
      const _name = target.content.value;

      var chan = Channels.findOne({'name': _name});


      if(name.indexOf('/') >= 0){
        Bert.alert("Cannot use backslash!", "danger");
      }
      else if (chan === undefined){
      Bert.alert("Channel with name "+_name+" created!", "success");
      Meteor.call('newChannel', {name: _name});
      $('.temp-channel-form').remove()
      }
      else{
        Bert.alert("channel already exists", "danger");
      }

    },

});
