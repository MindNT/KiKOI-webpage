import React from 'react';

/**
 * TagPrice - Brown translucent tag for displaying price
 * Props:
 * - price: number | string
 * - className: string (optional)
 */
const TagPrice = ({ price, className = "" }) => {
    return (
        <div
            className={`flex items-center justify-center ${className}`}
            style={{
                width: '80px',
                height: '40px',
                background: 'rgba(158, 73, 43, 0.25)',
                borderRadius: '10px'
            }}
        >
            <span
                style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#9E492B',
                    textAlign: 'center'
                }}
            >
                $ {price}
            </span>
        </div>
    );
};

export default TagPrice;
