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
					{/* Top Orange Section */}
					<div className="w-full bg-[#CE5C28] rounded-b-[30px] pt-6 pb-8 md:pb-12 flex flex-col items-center relative mb-6">
						<div className="w-full flex justify-start px-4 sm:px-6 mb-2">
							<WhiteRoundedReturn onClick={onClose} />
						</div>
						<img
							src={img}
							alt={name}
							className="object-contain w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px]"
							style={{
								transform: 'scale(1.2)'
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
									<DiscountTag />
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
				<div className="absolute bottom-6 left-0 right-0 bg-white px-6 md:px-10 py-4 pb-safe z-10">
					<div className="flex items-center justify-between">
						{/* Total Price */}
						<div className="flex flex-col">
							<span style={{
								fontFamily: 'Inter',
								fontStyle: 'normal',
								fontWeight: 400,
								fontSize: '16px',
								lineHeight: '19px',
								color: '#000000',
								marginBottom: '4px'
							}}>
								Total
							</span>
							<span
								className="md:text-[48px] md:leading-[56px]"
								style={{
								fontFamily: 'Inter',
								fontStyle: 'normal',
								fontWeight: 700,
								fontSize: '40px',
								lineHeight: '48px',
								color: '#E36414'
							}}>
								$ {parseFloat(price) * quantity}
							</span>
						</div>

						{/* Agregar Button */}
						<button
							onClick={handleAddToCart}
							disabled={!storeOpen}
							className="flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed md:w-[200px] md:h-[56px]"
							style={{
								width: '153px',
								height: '48px',
								background: '#E36414',
								borderRadius: '25px',
								border: 'none',
								outline: 'none'
							}}
						>
							<span style={{
								fontFamily: 'Inter',
								fontStyle: 'normal',
								fontWeight: 400,
								fontSize: '16px',
								lineHeight: '19px',
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
