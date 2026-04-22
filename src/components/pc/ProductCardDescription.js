import React, { useState } from 'react';
import { useCartStore } from '../../cartStore';
import ReturnButtonBrown from '../../utils/OrangeReturnButton';
import WhiteRoundedReturn from '../../utils/WhiteRoundedReturn';
import TagPrice from '../../utils/TagPrice';
import AttributesTag from '../../utils/AttributesTag';
import QuantitySelector from '../../utils/QuantitySelector';
import DiscountTag from '../../utils/DiscountTag';

/**
 * ProductCardDescription - Full product detail modal
 * Props:
 * - id: string | number
 * - name: string
 * - price: number | string
 * - img: string (url)
 * - description: string
 * - atributo_1: string
 * - atributo_2: string
 * - isOpen: boolean
 * - onClose: function
 * - onAdd: function (callback for add to cart)
 */
const ProductCardDescription = ({ id, name, price, img, description, atributo_1, atributo_2, apply_promotions, isOpen, onClose, onAdd }) => {
	const [quantity, setQuantity] = useState(1);
	const storeOpen = useCartStore(state => state.storeOpen);

	const handleIncrease = () => {
		setQuantity(prev => prev + 1);
	};

	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity(prev => prev - 1);
		}
	};

	const handleAddToCart = () => {
		if (storeOpen && onAdd && quantity > 0) {
			for (let i = 0; i < quantity; i++) {
				onAdd({ id, name, price, img });
			}
			setQuantity(1); // Reset
			onClose(); // Close modal
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[9999] bg-white flex flex-col">
			{/* Max-width container for mobile - responsive */}
			<div className="w-full sm:max-w-[480px] md:max-w-full mx-auto h-full flex flex-col relative overflow-hidden">

				{/* Scrollable Content */}
				<div className="flex-1 overflow-y-auto pb-32 pb-safe">
					{/* Top Image Section */}
					<div className="w-full bg-white pt-6 pb-8 md:pb-12 flex flex-col items-center relative mb-6">
						<div className="w-full flex justify-start px-4 sm:px-6 mb-2">
							<ReturnButtonBrown onClick={onClose} />
						</div>
						<img
							src={img}
							alt={name}
							className="object-contain w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px]"
							style={{
								transform: 'scale(1.2)',
								filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))'
							}}
						/>
					</div>

					<div className="px-6 md:px-10">
						{/* Product Name, Promo Tag and Quantity Selector */}
						<div className="flex items-start justify-between mb-4">
							<div style={{ maxWidth: '60%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
								<h1
									className="md:text-[30px] md:leading-[36px]"
									style={{
										fontFamily: 'Inter',
										fontStyle: 'normal',
										fontWeight: 700,
										fontSize: '24px',
										lineHeight: '29px',
										color: '#000000',
									}}
								>
									{name}
								</h1>
								{/* Promo badge below name */}
								{(apply_promotions === 1 || apply_promotions === true) && (
									<DiscountTag style={{ alignSelf: 'flex-start' }} />
								)}
							</div>
							<QuantitySelector
								quantity={quantity}
								onIncrease={handleIncrease}
								onDecrease={handleDecrease}
							/>
						</div>

						{/* Description */}
						{description && (
							<p
								className="mb-6 md:text-[16px] md:leading-[20px]"
								style={{
									fontFamily: 'Inter',
									fontStyle: 'normal',
									fontWeight: 400,
									fontSize: '14px',
									lineHeight: '17px',
									color: '#969696'
								}}
							>
								{description}
							</p>
						)}

						{/* Ingredients Section */}
						{(atributo_1 || atributo_2) && (
							<div className="mb-6">
								<h2
									className="mb-3"
									style={{
										fontFamily: 'Inter',
										fontStyle: 'normal',
										fontWeight: 400,
										fontSize: '16px',
										lineHeight: '19px',
										color: '#000000'
									}}
								>
									Ingredientes
								</h2>
								<div className="flex flex-wrap gap-3">
									{atributo_1 && <AttributesTag text={atributo_1} />}
									{atributo_2 && <AttributesTag text={atributo_2} />}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Fixed Bottom Section */}
				<div 
					className="absolute bottom-4 left-0 right-0 bg-white px-6 md:px-10 pt-3 pb-safe z-10 rounded-t-2xl"
					style={{ boxShadow: '0 -10px 30px rgba(0,0,0,0.03)' }}
				>
					<div className="flex items-center justify-between">
						{/* Total Price */}
						<div className="flex flex-col">
							<span style={{
								fontFamily: 'Inter, sans-serif',
								fontWeight: 500,
								fontSize: '12px',
								lineHeight: '1.2',
								color: '#969696',
								marginBottom: '2px'
							}}>
								Total
							</span>
							<span
								className="md:text-[36px]"
								style={{
								fontFamily: 'Inter, sans-serif',
								fontWeight: 800,
								fontSize: '30px',
								lineHeight: '1',
								letterSpacing: '-0.02em',
								color: '#1A1A1A'
							}}>
								<span className="text-[#E36414]">$</span>{parseFloat(price) * quantity}
							</span>
						</div>

						{/* Agregar Button */}
						<button
							onClick={handleAddToCart}
							disabled={!storeOpen}
							className="flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed md:w-[180px] md:h-[50px]"
							style={{
								width: '140px',
								height: '44px',
								background: '#E36414',
								borderRadius: '25px',
								border: 'none',
								outline: 'none',
								boxShadow: '0 4px 12px rgba(227, 100, 20, 0.25)'
							}}
						>
							<span style={{
								fontFamily: 'Inter, sans-serif',
								fontWeight: 600,
								fontSize: '15px',
								letterSpacing: '0.01em',
								color: '#FFFFFF'
							}}>
								Agregar
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCardDescription;
