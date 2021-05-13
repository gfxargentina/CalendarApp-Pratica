import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';


moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer

// //datos de ejemplo
// const events = [{
//     title: 'cumpleaños luis',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Practicar React',
//     user: {
//         _id: '123',
//         name: 'Luis'
//     }
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events } = useSelector(state => state.calendar)

    //para guardar la ultima vista
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month');

    //doble click para mostrar el evento
    const onDoubleClickEvent = (e) => {
        //console.log(e);
        dispatch( uiOpenModal() );
    }

    //para seleccionar el evento
    const onSelectEvent = (e) => {
        //console.log(e)
        dispatch( eventSetActive(e) );   
    }

    //para seleccionar la vista mes, semana, dia etc
    const onViewChange = (e) => {
        //console.log(e)
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        //console.log(event, start, end, isSelected)
        const style = {
            backgroundColor: '367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            //color: 'white'

        }

        return {
            style
        }

    }
    return (
        <div className="calendar-screen" >
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={onDoubleClickEvent}
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
                />
            <AddNewFab />
            <CalendarModal />    
        </div>
    )
}
