import React, { useState } from 'react';

/**
 * ToggleSwitch - iOS-style toggle switch dummy
 * Props:
 * - defaultChecked: boolean
 * - onToggle: function (optional)
 * - className: string (optional)
 */
const ToggleSwitch = ({ defaultChecked = false, onToggle, className = "" }) => {
    const [checked, setChecked] = useState(defaultChecked);

    const handleToggle = () => {
        if (onToggle) {
            onToggle(!checked);
        } else {
            // Default behavior just alerts as requested
            alert("¡Próximamente podrás usar tus puntos!");
            // setChecked(!checked); // Only if it should actually toggle visually
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`relative inline-flex items-center justify-center p-0 cursor-pointer ${className}`}
            style={{
                width: '60px',
                height: '30px',
                background: checked ? '#34C759' : '#34C759', // Always green per mockup, or toggle it: checked ? '#34C759' : '#E5E5EA'
                borderRadius: '25px',
                border: 'none',
                outline: 'none',
                transition: 'background-color 0.2s',
                padding: '2px'
            }}
        >
            <span
                className="absolute left-[10px] text-white font-[Inter] font-medium text-[12px] pointer-events-none"
                style={{ opacity: checked ? 1 : 1 }}
            >
                on
            </span>
            <span
                style={{
                    display: 'block',
                    width: '26px',
                    height: '26px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)',
                    transform: 'translateX(13px)', // Always 'on' position per mockup
                    transition: 'transform 0.2s'
                }}
            />
        </button>
    );
};

export default ToggleSwitch;
