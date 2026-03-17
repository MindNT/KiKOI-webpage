import React from 'react';

/**
 * Badge - A reusable pill-shaped badge component
 * 
 * @param {string} text - The text to display inside the badge
 * @param {string} bgColor - Background color (hex or rgba)
 * @param {string} textColor - Text color (hex or rgba)
 * @param {string} className - Additional CSS classes
 */
const Badge = ({ 
    text = 'Próximamente', 
    bgColor = 'rgba(255, 255, 255, 0.2)', // Semi-transparent white default
    textColor = '#FFFFFF', 
    className = '' 
}) => {
    return (
        <span
            className={`inline-flex items-center justify-center ${className}`}
            style={{
                background: bgColor,
                borderRadius: '12px',
                padding: '2px 8px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '10px',
                lineHeight: '12px',
                color: textColor,
            }}
        >
            {text}
        </span>
    );
};

export default Badge;
