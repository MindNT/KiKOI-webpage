import React from 'react';

/**
 * AttributesTag - Gray tag for displaying ingredient/attribute names
 * Props:
 * - text: string - The text to display
 * - className: string (optional)
 */
const AttributesTag = ({ text, className = "" }) => {
    return (
        <div
            className={`flex items-center justify-center ${className}`}
            style={{
                width: '150px',
                height: '40px',
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
                    color: '#535353',
                    textAlign: 'center'
                }}
            >
                {text}
            </span>
        </div>
    );
};

export default AttributesTag;
