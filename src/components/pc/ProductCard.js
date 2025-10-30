

import React from 'react';
// Asegúrate de tener la fuente Inter en tu proyecto (ya está en otros componentes)

/**
 * ProductCard
 * Props:
 * - id: string | number
 * - name: string
 * - price: number | string
 * - img: string (url)
 * - description: string
 * - onAdd: function (callback for add to cart)
 */
const ProductCard = ({ id, name, price, img, description, onAdd }) => {
       return (
	       <div className="group font-inter" style={{ fontSize: '0.95rem' }}>
		       <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3" style={{ minHeight: 150 }}>
			       <img
				       src={img}
				       alt={name}
				       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			       />
		       </div>
		       <div className="px-1">
			       <h4 className="text-sm font-light mb-1">{name}</h4>
			       {/* Descripción del producto */}
			       {/**
				* Se espera que la prop "description" sea string
				*/}
			       {typeof description === 'string' && description && (
				       <p className="text-xs text-gray-400 mb-1" style={{ fontSize: '0.8rem' }}>{description}</p>
			       )}
			       <div className="flex items-center justify-between">
				       <p className="text-sm text-gray-600">${price}</p>
				       <button
					       onClick={() => onAdd && onAdd({ id, name, price, img })}
					       className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
					       aria-label={`Agregar ${name} al carrito`}
				       >
					       <img src={process.env.PUBLIC_URL + '/assets/add.svg'} alt="Agregar" className="w-4 h-4" />
				       </button>
			       </div>
		       </div>
	       </div>
       );
};

export default ProductCard;
