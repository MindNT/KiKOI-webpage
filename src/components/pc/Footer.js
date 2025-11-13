import React, { useState } from 'react';
import { useLocation } from 'wouter';

const options = [
	{ label: 'Inicio', value: 'inicio' },
	{ label: 'Menu', value: 'menu' },
	{ label: 'Galeria', value: 'galeria' },
	{ label: 'Promociones', value: 'promociones' },
];


const Footer = () => {
	const [location, setLocation] = useLocation();
	// Normaliza la ruta para mostrar la opción activa
	let normalizedLocation = 'inicio';
	if (location === '/') normalizedLocation = 'inicio';
	else if (location === '/menu') normalizedLocation = 'menu';
	else if (location === '/galeria') normalizedLocation = 'galeria';
	else if (location === '/promociones') normalizedLocation = 'promociones';
	// Puedes agregar más rutas si es necesario

	return (
		<footer className="footer-fixed w-full border-t bg-white" style={{ borderTop: '1px solid #f2f2f2' }}>
			<div className="flex justify-center items-center py-3 md:py-4">
				{/* Diseño para móvil: 2x2 grid */}
				<div className="grid grid-cols-2 gap-2 w-full px-4 md:hidden">
				{options.map(opt => {
					let path = '/';
					if (opt.value === 'menu') path = '/menu';
					if (opt.value === 'galeria') path = '/galeria';
					if (opt.value === 'promociones') path = '/promociones';
					const isActive = normalizedLocation === opt.value;
						return (
							<button
								key={opt.value}
								onClick={() => setLocation(path)}
								className={`text-sm font-light transition-colors duration-200 px-2 py-2 rounded-lg ${
									isActive 
										? 'text-black bg-gray-50' 
										: 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
								}`}
							>
								{opt.label}
							</button>
						);
					})}
				</div>

				{/* Diseño para desktop: horizontal */}
				<div className="hidden md:flex space-x-8 mx-8">
				{options.map(opt => {
					let path = '/';
					if (opt.value === 'menu') path = '/menu';
					if (opt.value === 'galeria') path = '/galeria';
					if (opt.value === 'promociones') path = '/promociones';
					const isActive = normalizedLocation === opt.value;
					return (
						<button
							key={opt.value}
							onClick={() => setLocation(path)}
							className={`text-base font-light transition-colors duration-200 px-2 py-1 ${isActive ? 'text-black' : 'text-gray-400'}`}
								style={{ marginLeft: 32, marginRight: 32, background: 'transparent' }}
							>
								{opt.label}
							</button>
						);
					})}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
