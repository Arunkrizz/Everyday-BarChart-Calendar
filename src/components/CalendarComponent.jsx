import React, { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate, setShowModal, setView } from '../redux/calendarSlice';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const { data, view } = useSelector(state => state.calendar);

  // Convert data to calendar events
  const events = useMemo(() => {
    return Object.keys(data).map(dateStr => {
      const date = moment(dateStr, 'DD-MM-YYYY').toDate();
      const dataPoints = data[dateStr];
      const totalValue = dataPoints.reduce((sum, item) => sum + Object.values(item)[0], 0);
      return {
        id: dateStr,
        title: `${dataPoints.length} users (${totalValue} total)`,
        start: date,
        end: date,
        allDay: true,
        resource: { dateStr, data: dataPoints, total: totalValue }
      };
    });
  }, [data]);

  // Handle date selection
  const handleSelectEvent = (event) => {
    dispatch(setSelectedDate(event.resource));
    dispatch(setShowModal(true));
  };

  const handleSelectSlot = ({ start }) => {
    const dateStr = moment(start).format('DD-MM-YYYY');
    if (data[dateStr]) {
      dispatch(setSelectedDate({ dateStr, data: data[dateStr] }));
    } else {
      dispatch(setSelectedDate({ dateStr, data: null }));
    }
    dispatch(setShowModal(true));
  };

  // Custom event style
  const eventStyleGetter = (event) => {
    const intensity = Math.min(event.resource.total / 20, 1);
    return {
      style: {
        backgroundColor: `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: '2px solid #3b82f6',
        fontSize: '12px',
        fontWeight: '600'
      }
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded opacity-60"></div>
            <span>Low Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>High Activity</span>
          </div>
        </div>

        <div className="flex gap-2">
          {['month', 'week', 'day'].map((v) => (
            <button
              key={v}
              onClick={() => dispatch(setView(v))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === v ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        view={view}
        onView={(newView) => dispatch(setView(newView))}
        popup
        className="custom-calendar"
      />
    </div>
  );
};

export default CalendarComponent;
