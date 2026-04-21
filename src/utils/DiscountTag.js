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
                background: '#D97706',
                borderRadius: '20px',
                boxShadow: '0 2px 6px rgba(217, 119, 6, 0.35)',
                ...style,
            }}
        >
            {/* Lightning bolt icon */}
            <svg
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
            >
                <path
                    d="M6.5 0.5L0.5 7.833H5L4.5 13.5L10.5 6.167H6L6.5 0.5Z"
                    fill="white"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.3"
                    strokeLinejoin="round"
                />
            </svg>

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
