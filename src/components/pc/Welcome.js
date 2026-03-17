import React from 'react';

const Welcome = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: '#CE5C28' }}
        >
            {/* Logo Container */}
            <div className="animate-pulse">
                <img
                    src={`${process.env.PUBLIC_URL}/images/kikoi_logo.png`}
                    alt="KiKOI Logo"
                    className="w-72 h-72 object-contain"
                />
            </div>
        </div>
    );
};

export default Welcome;
