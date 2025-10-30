import React from 'react';
import Navbar from '../components/pc/Navbar';
import Footer from '../components/pc/Footer';

import EventsBox from '../components/pc/EventsBox';
import Billingcar from '../components/pc/Billingcar';


const Eventos = () => {
  return (
    <div className="min-h-screen bg-white font-inter relative">
      {/* Navbar flotante */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <Navbar />
      </div>
      {/* Contenido scrolleable */}
      <div className="pt-20 pb-20 px-8 min-h-[calc(100vh-128px)] overflow-y-auto">
        <EventsBox />
      </div>
      {/* Footer flotante */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white">
        <Footer />
      </div>
      {/* Billingcar sidebar */}
      <Billingcar />
    </div>
  );
};

export default Eventos;
