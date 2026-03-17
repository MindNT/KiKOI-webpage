import React from 'react';

/**
 * BrownRounded - Brown rounded button for primary actions
 * Props:
 * - onClick: function
 * - disabled: boolean
 * - text: string (default: "Agregar")
 * - icon: string (optional icon path)
 * - className: string (optional)
 */
const BrownRounded = ({ onClick, disabled = false, text = "Agregar", icon, className = "" }) => {
    // Check if full width is requested
    const isFullWidth = className.includes('w-full');

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                flex items-center justify-center gap-1 sm:gap-2
                transition-all duration-200
                active:scale-95
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-95'}
                ${className}
            `}
            style={{
                width: isFullWidth ? '100%' : undefined,
                height: undefined,
                background: '#CE5C28',
                borderRadius: '25px',
                border: 'none',
                outline: 'none',
                padding: '10px 16px',
                minWidth: isFullWidth ? undefined : '120px',
                minHeight: '40px'
            }}
        >
            {icon && (
                <div className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] flex items-center justify-center">
                    <img src={icon} alt="icon" className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
            )}
            <span
                style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#FFFFFF',
                    textAlign: 'center'
                }}
            >
                {text}
            </span>
        </button>
    );
};

export default BrownRounded;

