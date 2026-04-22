import React, { useState } from 'react';
import { useCartStore } from '../../cartStore';
import BrownRoundedSmall from '../../utils/OrangeRoundedSmall';
import InfoButton from '../../utils/InfoButton';
import ProductCardDescription from './ProductCardDescription';
import DiscountTag from '../../utils/DiscountTag';

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
const ProductCardMenu = ({ id, name, price, img, description, atributo_1, atributo_2, apply_promotions, onAdd }) => {
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
            {/* Card: fills full grid column width, fixed aspect ratio */}
            <div
                onClick={handleCardClick}
                className="relative bg-[#F5F5F5] overflow-hidden cursor-pointer w-full"
                style={{
                    aspectRatio: '165 / 224',
                    boxSizing: 'border-box',
                    border: 'none',
                    borderRadius: '14px',
                    minWidth: 0,
                    animation: 'cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
            >
                <style>{`
                    @keyframes cardFadeIn {
                        from { opacity: 0; transform: translateY(15px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
                {/* Info Button — top left */}
                <div className="absolute" style={{ top: '8px', left: '8px', zIndex: 20 }}>
                    <InfoButton onClick={handleCardClick} />
                </div>

                {/* Discount Tag — top right, only when apply_promotions === 1 */}
                {(apply_promotions === 1 || apply_promotions === true) && (
                    <div className="absolute" style={{ top: '8px', right: '8px', zIndex: 20 }}>
                        <DiscountTag />
                    </div>
                )}

                {/* Product Image — upper center, ~55% of card */}
                <div
                    className="absolute z-10 flex items-center justify-center pointer-events-none"
                    style={{
                        width: '88%',
                        height: '52%',
                        top: '9%',
                        left: '6%'
                    }}
                >
                    <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-contain"
                        style={{ filter: 'drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.15))' }}
                    />
                </div>

                {/* Bottom section: name + price left, add button right */}
                <div
                    className="absolute"
                    style={{
                        left: '10px',
                        right: '10px',
                        bottom: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '4px'
                    }}
                >
                    {/* Left: Name then Price, tightly stacked */}
                    <div
                        className="pointer-events-none"
                        style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1px' }}
                    >
                        <h3
                            className="truncate text-left w-full"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(12px, 3.6vw, 16px)',
                                lineHeight: '1.2',
                                color: '#1A1A1A',
                                margin: 0
                            }}
                        >
                            {name}
                        </h3>
                        <span
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 800,
                                fontSize: 'clamp(15px, 4.5vw, 21px)',
                                lineHeight: '1.1',
                                color: '#CE5C28',
                                display: 'block'
                            }}
                        >
                            ${price}
                        </span>
                    </div>

                    {/* Right: Add button */}
                    <div
                        className="pointer-events-auto flex-shrink-0"
                        style={{ width: '32px', height: '32px' }}
                    >
                        <BrownRoundedSmall
                            onClick={handleAddClick}
                            disabled={!storeOpen}
                        />
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
                apply_promotions={apply_promotions}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onAdd={onAdd}
            />
        </>
    );
};

export default ProductCardMenu;
