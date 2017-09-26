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
        `<h6>${ event.title }</h6>
         <p class="description">${ event.description }</p>
         <p class="type-${ event.type }">${ event.type }</p>
        `
      );
    },

    eventDrop( event, delta, revert ) {
        let date = event.start.format();
        if ( Meteor.userId() == event.ID ) {
          if(!isPast( date )){
              let update = {
                _id: event._id,
                start: date,
                end: date,
                ID: Meteor.userId()

              };
            
              Meteor.call( 'editItem', update, ( error ) => {
                if ( error ) {
                  Bert.alert( error.reason, 'danger' );
                }
              });
          }else {
            revert();
            Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
          }
        } else {
          revert();
          Bert.alert('Sorry, you can only move items you made!', 'danger');
        }
      },

    dayClick( date ) {
      if(Meteor.userId() != null){
        Session.set( 'eventModal', { type: 'add', date: date.format() } );
        $( '#add-edit-event-modal' ).modal( 'show' );
      } else{
        Bert.alert("You need to be signed in to add an event!", 'danger');
      }
    },
    eventClick( event ) {
      if(Meteor.userId() == event.ID){
        Session.set( 'eventModal', { type: 'edit', event: event._id } );
        $( '#add-edit-event-modal' ).modal( 'show' );
      } else{
        Session.set( 'eventModal', { type: 'show', event: event._id } );
        $( '#add-edit-event-modal' ).modal( 'show' );
      }

    },

  });

  Tracker.autorun( () => {
     Meteor.call('findItem');
    $( '#items-calendar' ).fullCalendar( 'refetchEvents' );
  });


});
