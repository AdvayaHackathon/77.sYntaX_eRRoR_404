// src/pages/CalendarPage.tsx
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const API_KEY = 'AIzaSyAnLHxbVsPip3I2on-xCpzOrMDWGVxpY78'; // Replace with your key
const CALENDAR_ID = 'en.indian%23holiday%40group.v.calendar.google.com'; // Indian holidays

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date().toISOString();
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${today}&singleEvents=true&orderBy=startTime`
      );

      const fetchedEvents = response.data.items.map((event: any) => ({
        title: event.summary,
        date: event.start.date || event.start.dateTime,
      }));

      setEvents(fetchedEvents);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">
          Cultural & Festival Events Calendar
        </h2>
        <div className="bg-white p-4 rounded-xl shadow-lg border">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalendarPage;
