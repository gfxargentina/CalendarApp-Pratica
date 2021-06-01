import { eventsDate } from "../helpers/eventsDate";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";


export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {
        //console.log(event);

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            //console.log(body);

            if ( body.ok ) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
            }
            dispatch( eventAddNew(event) );

        } catch (error) {
            
        }


    }
}


const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({
    type: types.eventDeleted
})

//muestra los eventos de la BD
export const eventStartLoading = () => {
    return async(dispatch) => {
        //console.log('eventStartLoading ok');

        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();
            //console.log(body);

            const events = eventsDate( body.eventos );
            //console.log(events)

            dispatch ( eventLoaded( events) );

        } catch (error) {
            console.log(error)
            
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})