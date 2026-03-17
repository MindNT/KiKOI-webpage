import React from 'react';

const InfoButton = ({ onClick, className = '' }) => {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e);
            }}
            className={`
                flex items-center justify-center
                w-[30px] h-[30px] rounded-[25px]
                transition-transform hover:opacity-90 active:scale-95
                ${className}
            `}
            style={{
                background: '#3E2723',
                border: 'none',
                outline: 'none',
                cursor: 'pointer'
            }}
        >
            <img
                src={`${process.env.PUBLIC_URL}/assets/icon_info.svg`}
                alt="Info"
                className="w-[22px] h-[22px] object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
            />
        </button>
    );
};

export default InfoButton;
