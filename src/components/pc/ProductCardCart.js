import React from 'react';
import CartQuantitySelector from '../../utils/CartQuantitySelector';
import OrangeRounded from '../../utils/OrangeRounded';

/**
 * ProductCardCart - Product card for shopping cart
 * Props:
 * - item: object { id, name, description, price, img, qty, atributo_1, atributo_2 }
 * - onIncrease: function
 * - onDecrease: function
 * - onDelete: function
 */
const ProductCardCart = ({ item, onIncrease, onDecrease, onDelete }) => {
    return (
        <div
            className="p-4 mb-4 relative"
            style={{
                background: '#F6F6F6',
                borderRadius: '15px'
            }}
        >
            {/* Main Content Area */}
            <div className="flex items-start gap-4">
                {/* Left: Product Image */}
                <div
                    className="flex-shrink-0 flex items-center justify-center w-[70px] h-[90px] sm:w-[80px] sm:h-[100px]"
                    style={{}}
                >
                    <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-contain drop-shadow"
                    />
                </div>

                {/* Right: Info and Actions */}
                <div className="flex-1 flex flex-col justify-between pt-1">
                    {/* Top Row: Title, Delete */}
                    <div className="flex items-start justify-between">
                        <h3
                            className="pr-2"
                            style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '19px',
                                color: '#000000',
                                marginBottom: '4px'
                            }}
                        >
                            {item.name}
                        </h3>

                        {/* Delete Button (Trash) positioned natively */}
                        <div className="flex-shrink-0 cursor-pointer text-red-500" onClick={() => onDelete(item.id)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#ff0000" />
                            </svg>
                        </div>
                    </div>

                    {/* Subtitle / Description */}
                    <p
                        className="mb-3 pr-8"
                        style={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '14px',
                            color: '#969696'
                        }}
                    >
                        {item.description ? item.description : (item.atributo_1 || item.atributo_2 ? [item.atributo_1, item.atributo_2].filter(Boolean).join(', ') : 'Descripción del producto')}
                    </p>

                    {/* Bottom Row: Price and Quantity */}
                    <div className="flex items-center justify-between mt-auto">
                        {/* Price */}
                        <span
                            style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '18px',
                                lineHeight: '22px',
                                color: '#535353'
                            }}
                        >
                            ${item.price}
                        </span>

                        {/* Separated Quantity Selector */}
                        <CartQuantitySelector
                            quantity={item.qty}
                            onIncrease={onIncrease}
                            onDecrease={onDecrease}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardCart;
