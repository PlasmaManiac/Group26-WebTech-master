let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};
Template.items.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'items' );
});

Template.items.onRendered( () => {
  $( '#items-calendar' ).fullCalendar({
    events( start, end, timezone, callback ) {
      let data = Items.find().fetch().map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },
    eventRender( event, element ) {
      element.find( '.fc-content' ).html(
        `<h4>${ event.title }</h4>
         <p class="guest-count">${ event.guests } Guests</p>
         <p class="type-${ event.type }">#${ event.type }</p>
        `
      );
    },

    eventDrop( event, delta, revert ) {
        let date = event.start.format();
        if ( !isPast( date ) ) {
          let update = {
            _id: event._id,
            start: date,
            end: date
          };
          console.dir(update);
          Meteor.call( 'editItem', update, ( error ) => {
            if ( error ) {
              Bert.alert( error.reason, 'danger' );
            }
          });
        } else {
          revert();
        Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
        }
      },

    dayClick( date ) {
      Session.set( 'eventModal', { type: 'add', date: date.format() } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    },
    eventClick( event ) {
      Session.set( 'eventModal', { type: 'edit', event: event._id } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    },

  });

  Tracker.autorun( () => {
    Items.find().fetch();
    $( '#items-calendar' ).fullCalendar( 'refetchEvents' );
  });


});
