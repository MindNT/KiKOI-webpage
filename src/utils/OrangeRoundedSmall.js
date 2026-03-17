import React from 'react';

/**
 * BrownRoundedSmall - Small circular brown button with plus icon
 * Used for "Add to cart" actions
 * Props:
 * - onClick: function
 * - disabled: boolean
 * - className: string (optional)
 */
const BrownRoundedSmall = ({ onClick, disabled = false, className = "" }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex items-center justify-center
                w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]
                transition-all duration-200
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-90'}
                ${className}
            `}
            style={{
                background: disabled ? '#CCCCCC' : '#CE5C28',
                borderRadius: '25px',
                border: 'none',
                outline: 'none'
            }}
        >
            {/* Plus Icon */}
            <svg className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5V15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10H15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
};

export default BrownRoundedSmall;
