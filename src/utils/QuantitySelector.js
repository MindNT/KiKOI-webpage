import React from 'react';

/**
 * QuantitySelector - Component with +/- buttons and quantity display
 * Props:
 * - quantity: number
 * - onIncrease: function
 * - onDecrease: function
 * - className: string (optional)
 */
const QuantitySelector = ({ quantity, onIncrease, onDecrease, className = "" }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Decrease Button (Orange) */}
            <button
                onClick={onDecrease}
                disabled={quantity <= 1}
                className={`flex items-center justify-center transition-all duration-200 ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'active:scale-90'
                    }`}
                style={{
                    width: '32px',
                    height: '32px',
                    background: '#CE5C28',
                    borderRadius: '25px',
                    border: 'none',
                    outline: 'none'
                }}
            >
                {/* Minus Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10H15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Quantity Display */}
            <div
                className="flex items-center justify-center"
                style={{
                    width: '67px',
                    height: '32px',
                    background: '#F2F2F2',
                    borderRadius: '25px'
                }}
            >
                <span
                    style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '17px',
                        color: '#2C2C2C',
                        textAlign: 'center'
                    }}
                >
                    {quantity}
                </span>
            </div>

            {/* Increase Button (Brown) */}
            <button
                onClick={onIncrease}
                className="flex items-center justify-center transition-all duration-200 active:scale-90"
                style={{
                    width: '32px',
                    height: '32px',
                    background: '#CE5C28',
                    borderRadius: '25px',
                    border: 'none',
                    outline: 'none'
                }}
            >
                {/* Plus Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 5V15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 10H15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default QuantitySelector;
