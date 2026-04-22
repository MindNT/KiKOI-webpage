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
                w-[28px] h-[28px] rounded-full
                transition-all duration-200 hover:opacity-90 active:scale-95
                ${className}
            `}
            style={{
                background: '#000000',
                border: 'none',
                outline: 'none',
                cursor: 'pointer'
            }}
        >
            <img
                src={`${process.env.PUBLIC_URL}/assets/click.svg`}
                alt="Ver descripción"
                className="w-[14px] h-[14px] object-contain flex-shrink-0"
                style={{ filter: 'brightness(0) invert(1)' }}
            />
        </button>
    );
};

export default InfoButton;
