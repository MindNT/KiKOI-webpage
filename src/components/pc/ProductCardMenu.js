import React, { useState } from 'react';
import { useCartStore } from '../../cartStore';
import BrownRoundedSmall from '../../utils/OrangeRoundedSmall';
import InfoButton from '../../utils/InfoButton';
import ProductCardDescription from './ProductCardDescription';

/**
 * ProductCardMenu - Compact card for menu display
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
const ProductCardMenu = ({ id, name, price, img, description, atributo_1, atributo_2, onAdd }) => {
    const [showModal, setShowModal] = useState(false);
    const storeOpen = useCartStore(state => state.storeOpen);

    const handleAddClick = (e) => {
        e.stopPropagation();
        if (storeOpen && onAdd) {
            onAdd({ id, name, price, img, atributo_1, atributo_2 });
        }
    };

    const handleCardClick = () => {
        setShowModal(true);
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                className="relative bg-[#F5F5F5] overflow-hidden cursor-pointer"
                style={{
                    width: '165px',
                    height: '224px',
                    boxSizing: 'border-box',
                    border: '1px solid #F5F5F5',
                    borderRadius: '10px'
                }}
            >
                {/* Info Button (Top Left) */}
                <div className="absolute" style={{ top: '8px', left: '8px', zIndex: 20 }}>
                    <InfoButton onClick={handleCardClick} />
                </div>

                {/* Product Image */}
                <div 
                    className="absolute z-10 flex items-center justify-center pointer-events-none"
                    style={{ 
                        width: '133px', 
                        height: '80px', 
                        top: '40px', 
                        left: '16px' 
                    }}
                >
                    <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-contain"
                        style={{ transform: 'scale(1.2)' }}
                    />
                </div>

                {/* Content Section (Bottom) */}
                <div 
                    className="absolute"
                    style={{
                        width: '151px',
                        height: '73px',
                        left: '7px',
                        bottom: '7px',
                        background: '#F5F5F5',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '4px'
                    }}
                >
                    <div className="flex flex-col relative z-20 pointer-events-none">
                        {/* Product Name */}
                        <h3
                            className="truncate text-left"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '19px',
                                color: '#2C2C2C',
                                margin: 0,
                                width: '130px'
                            }}
                        >
                            {name}
                        </h3>

                        {/* Subtitle / Attributes */}
                        <p
                            className="truncate text-left mt-[2px]"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '12px',
                                lineHeight: '15px',
                                color: '#535353',
                                margin: 0,
                                width: '130px'
                            }}
                        >
                            {[atributo_1, atributo_2].filter(Boolean).join(', ') || name}
                        </p>
                    </div>

                    <div className="flex items-end justify-between w-full h-full relative z-20">
                        {/* Price */}
                        <span
                            className="pointer-events-none"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '19px',
                                color: '#969696',
                                alignSelf: 'flex-end',
                                marginBottom: '2px',
                                marginLeft: '2px'
                            }}
                        >
                            ${price}
                        </span>

                        {/* Add Button */}
                        <div 
                            className="absolute pointer-events-auto" 
                            style={{ 
                                right: '-2px', 
                                bottom: '-2px',
                                width: '30px', 
                                height: '30px' 
                            }}
                        >
                            <BrownRoundedSmall
                                onClick={handleAddClick}
                                disabled={!storeOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Detail Modal */}
            <ProductCardDescription
                id={id}
                name={name}
                price={price}
                img={img}
                description={description}
                atributo_1={atributo_1}
                atributo_2={atributo_2}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onAdd={onAdd}
            />
        </>
    );
};

export default ProductCardMenu;

