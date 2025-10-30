import React from 'react';
import { useLocation } from 'wouter';
import Navbar from '../components/pc/Navbar';
import Footer from '../components/pc/Footer';

import BlackRoundedButton from '../utils/blackroundedbutton';
import Billingcar from '../components/pc/Billingcar';


const Inicio = () => {
	const [, setLocation] = useLocation();

	return (
		<div className="min-h-screen bg-white flex flex-col justify-between relative" style={{ fontFamily: 'Inter, sans-serif' }}>
			<Navbar />
			<main className="flex-1 flex flex-col items-center justify-center px-4">
				<h1 className="text-5xl md:text-7xl font-extralight mb-6 tracking-tight leading-tight text-black text-center">Elegancia para compartir en<br />cada sorbo</h1>
				<p className="text-lg text-gray-500 font-light max-w-2xl mx-auto mb-12 text-center">Donde la tradición de un buen cafe con amigos encuentra lugar. Calidad excepcional a precio accesible.</p>
				<BlackRoundedButton onClick={() => setLocation('/menu')}>Ver menú</BlackRoundedButton>
			</main>
			<Footer />
			{/* Billingcar sidebar */}
			<Billingcar />
		</div>
	);
};

export default Inicio;