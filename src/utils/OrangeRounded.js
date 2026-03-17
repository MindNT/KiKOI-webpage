import React from 'react';

const OrangeRounded = ({ icon, onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`
                relative
                w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]
                bg-[#FF5722]
                rounded-[25px]
                flex items-center justify-center
                transition-transform active:scale-95
                shadow-sm
                ${className}
            `}
        >
            <img
                src={icon}
                alt="icon"
                className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
                style={{ filter: 'brightness(0) invert(1)' }}
            />
        </button>
    );
};

export default OrangeRounded;
