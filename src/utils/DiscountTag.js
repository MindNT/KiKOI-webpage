import React from 'react';

/**
 * DiscountTag - Eye-catching promo badge for items with apply_promotions = 1
 * Styled to complement the existing design (brown/orange palette) but with
 * a vivid accent that grabs attention.
 *
 * Props:
 * - className: string (optional)
 * - style: object (optional)
 */
const DiscountTag = ({ className = '', style = {} }) => {
    return (
        <div
            className={`flex items-center gap-[4px] ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px 3px 6px',
                background: '#E11D48',
                borderRadius: '20px',
                boxShadow: 'none',
                ...style,
            }}
        >
            {/* Custom Icon */}
            <img
                src={`${process.env.PUBLIC_URL}/assets/disccount.svg`}
                alt="Promo"
                className="w-[12px] h-[12px] object-contain flex-shrink-0"
                style={{ filter: 'brightness(0) invert(1)' }}
            />

            {/* Label */}
            <span
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: '10px',
                    lineHeight: '12px',
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                }}
            >
                Promo
            </span>
        </div>
    );
};

export default DiscountTag;
