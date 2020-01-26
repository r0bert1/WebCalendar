import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import './Calendar.scss';
import './Calendar.css';

const Calendar = ({
  user,
  date,
  setClickedDate,
  setClickedEvent,
  showCreate,
  showModify,
  events
}) => {
  const calendarRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const handleDateChange = selectedDate => {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate);
    };

    if (user && date) {
      handleDateChange(date);
    }
  }, [calendarRef, user, date]);

  const handleWindowResize = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.setOption('height', 100);
    const container = containerRef.current;
    calendarApi.setOption('height', container.offsetHeight - 32);
  };

  useEffect(() => {
    handleWindowResize();
  }, []);

  const handleDateClick = info => {
    setClickedDate(info.date);
    showCreate(true);
  };

  const handleEventClick = info => {
    setClickedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end
    });
    showModify(true);
  };

  return (
    <div className="calendar-container" ref={containerRef}>
      <FullCalendar
        ref={calendarRef}
        header={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
        columnHeaderFormat={{ day: 'numeric' }}
        firstDay={1}
        now={date}
        dateClick={handleDateClick}
        defaultView="timeGridWeek"
        allDaySlot={false}
        plugins={[timeGridPlugin, interactionPlugin, bootstrapPlugin]}
        themeSystem="bootstrap"
        events={events}
        eventClick={handleEventClick}
        eventTextColor="#FFF"
        height={100}
        windowResize={handleWindowResize}
      />
    </div>
  );
};

export default Calendar;
