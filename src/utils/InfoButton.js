import React from 'react';

const InfoButton = ({ onClick, className = '' }) => {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e);
            }}
            className={`
                flex items-center gap-[5px]
                px-[8px] h-[26px] rounded-[25px]
                transition-all duration-200 hover:opacity-90 active:scale-95
                ${className}
            `}
            style={{
                background: '#000000',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
            }}
        >
            <img
                src={`${process.env.PUBLIC_URL}/assets/click.svg`}
                alt="Ver descripción"
                className="w-[13px] h-[13px] object-contain flex-shrink-0"
                style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '10px',
                    lineHeight: '1',
                    color: '#FFFFFF',
                    letterSpacing: '0.02em'
                }}
            >
                Descripción
            </span>
        </button>
    );
};

export default InfoButton;
