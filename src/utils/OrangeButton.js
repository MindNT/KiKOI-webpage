import React from 'react';

const BrownButton = ({ onClick, disabled, children, type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                w-[220px] sm:w-[265px]
                h-[44px] sm:h-[48px]
                rounded-[25px]
                flex items-center justify-center
                font-sans font-normal text-[14px] sm:text-[16px] leading-[17px] sm:leading-[19px] text-center
                transition-colors duration-200
                ${disabled
                    ? 'bg-[#E36414]/50 text-white/50 cursor-not-allowed'
                    : 'bg-[#E36414] text-[#FFFFFF] active:opacity-90 hover:opacity-95'
                }
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default BrownButton;
