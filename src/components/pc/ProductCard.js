

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
       const [showDescription, setShowDescription] = useState(false);
       return (
	       <div className="group font-inter relative">
		       <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-2 md:mb-3 relative" style={{ minHeight: 120 }}>
			       <img
				       src={img}
				       alt={name}
				       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
				       onClick={() => description && setShowDescription(!showDescription)}
			       />
		       {/* Botón de información responsivo */}
		       {description && (
			       <button
				       onClick={() => setShowDescription(!showDescription)}
				       className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm border border-white/50"
				       aria-label="Ver descripción"
			       >
				       <span className="text-xs font-semibold text-gray-800">i</span>
			       </button>
		       )}
		       
		       {/* Overlay de descripción responsivo */}
			       {showDescription && description && (
				       <div 
					       className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 md:p-3 rounded-xl cursor-pointer"
					       onClick={() => setShowDescription(false)}
				       >
				       <div 
					       className="text-white text-xs md:text-sm text-center leading-relaxed max-w-xs px-1"
					       onClick={(e) => e.stopPropagation()}
				       >
					       {description}
				       </div>
					       <button
						       onClick={() => setShowDescription(false)}
						       className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
						       aria-label="Cerrar descripción"
					       >
						       <span className="text-white text-xs">×</span>
					       </button>
				       </div>
			       )}
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
       );
};

export default ProductCard;
