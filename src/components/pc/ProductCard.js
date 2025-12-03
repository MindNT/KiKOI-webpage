

import React, { useState } from 'react';
// Asegúrate de tener la fuente Inter en tu proyecto (ya está en otros componentes)

/**
 * ProductCard
 * Props:
 * - id: string | number
 * - name: string
 * - price: number | string
 * - img: string (url)
 * - description: string
 * - atributo_1: string
 * - atributo_2: string
 * - onAdd: function (callback for add to cart)
 */
const ProductCard = ({ id, name, price, img, description, atributo_1, atributo_2, onAdd }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="group font-inter relative">
				<div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-2 md:mb-3 relative" style={{ minHeight: 120 }}>
					<img
						src={img}
						alt={name}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
						onClick={() => setShowModal(true)}
					/>
				</div>

				<div className="px-0.5 md:px-1">
					<h4 className="text-sm md:text-base font-light mb-1.5 md:mb-2 leading-tight">{name}</h4>

					{/* Etiquetas de atributos responsivas */}
					{(atributo_1 || atributo_2) && (
						<div className="flex gap-1 mb-2 md:mb-3 flex-wrap">
							{atributo_1 && atributo_1.trim() !== "" && (
								<span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-50 text-gray-500 rounded-full text-xs md:text-sm font-light border border-gray-100">
									{atributo_1}
								</span>
							)}
							{atributo_2 && atributo_2.trim() !== "" && (
								<span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-50 text-gray-500 rounded-full text-xs md:text-sm font-light border border-gray-100">
									{atributo_2}
								</span>
							)}
						</div>
					)}

					<div className="flex items-center justify-between">
						<p className="text-base md:text-lg font-medium text-gray-900">${price}</p>
						<button
							onClick={() => onAdd && onAdd({ id, name, price, img })}
							className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors active:scale-95"
							aria-label={`Agregar ${name} al carrito`}
						>
							<img src={process.env.PUBLIC_URL + '/assets/add.svg'} alt="Agregar" className="w-3.5 h-3.5 md:w-4 md:h-4" />
						</button>
					</div>
				</div>
			</div>

			{/* Modal de información del producto */}
			{showModal && (
				<div
					className="fixed inset-0 z-[9999] flex items-center justify-center px-8 py-8 bg-black/70 backdrop-blur-lg"
					onClick={() => setShowModal(false)}
				>
					<div
						className="bg-black/60 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full border border-white/10 overflow-hidden"
						style={{
							maxHeight: '90vh',
							animation: 'fadeIn 0.2s ease-out'
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Contenido del modal */}
						<div className="p-10 md:p-12 overflow-y-auto" style={{ maxHeight: '90vh' }}>
							{/* Botón de cerrar */}
							<div className="flex justify-end mb-6">
								<button
									onClick={() => setShowModal(false)}
									className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
									aria-label="Cerrar"
								>
									<svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{/* Nombre del producto */}
							<h3 className="text-3xl md:text-4xl font-light mb-8 text-white leading-tight">
								{name}
							</h3>

							{/* Atributos */}
							{(atributo_1 || atributo_2) && (
								<div className="flex gap-3 mb-8 flex-wrap">
									{atributo_1 && atributo_1.trim() !== "" && (
										<span className="px-5 py-2.5 bg-white/10 text-white/90 rounded-full text-sm font-light border border-white/20 backdrop-blur-sm">
											{atributo_1}
										</span>
									)}
									{atributo_2 && atributo_2.trim() !== "" && (
										<span className="px-5 py-2.5 bg-white/10 text-white/90 rounded-full text-sm font-light border border-white/20 backdrop-blur-sm">
											{atributo_2}
										</span>
									)}
								</div>
							)}

							{/* Descripción */}
							{description && (
								<div className="mb-10">
									<p className="text-base md:text-lg text-white/80 leading-relaxed font-light">
										{description}
									</p>
								</div>
							)}

							{/* Precio y botón de agregar */}
							<div className="flex items-center justify-between pt-8 border-t border-white/10">
								<div>
									<p className="text-xs text-white/50 font-light mb-2 uppercase tracking-wider">Precio</p>
									<p className="text-4xl md:text-5xl font-light text-white">${price}</p>
								</div>
								<button
									onClick={() => {
										onAdd && onAdd({ id, name, price, img });
										setShowModal(false);
									}}
									className="px-10 py-4 bg-white text-black rounded-full text-base font-light hover:bg-white/90 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
								>
									Agregar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductCard;
