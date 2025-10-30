import React from 'react';

// Dummy data para eventos
const events = [
  { title: 'Cata de café especial', time: '18:00 - 20:00', date: '30 Oct 2025' },
  { title: 'Taller de barismo', time: '16:00 - 19:00', date: '5 Nov 2025' },
  { title: 'Música en vivo', time: '19:00 - 22:00', date: '12 Nov 2025' },
];

const EventsBox = ({ eventList = events }) => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-extralight mb-16 text-center">Eventos</h2>
    <div className="space-y-6">
      {eventList.map((event, i) => (
        <div key={i} className="flex items-center justify-between p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
          <div>
            <h3 className="text-xl font-light mb-1">{event.title}</h3>
            <p className="text-sm text-gray-500">{event.time}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extralight text-gray-400">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EventsBox;
