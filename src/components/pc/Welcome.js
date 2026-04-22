import React from 'react';

const Welcome = () => {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center gap-12 py-12"
            style={{ backgroundColor: '#E36414' }}
        >
            {/* Logo — más pequeño */}
            <div className="animate-pulse">
                <img
                    src={`${process.env.PUBLIC_URL}/images/kikoi_logo.png`}
                    alt="KiKOI Logo"
                    className="w-52 h-52 object-contain"
                />
            </div>

            {/* by MindNT — tag al fondo, clickeable */}
            <a
                href="https://www.mindnt.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 14px',
                    background: 'rgba(255,255,255,0.18)',
                    borderRadius: '25px',
                    border: '1px solid rgba(255,255,255,0.30)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
                <span
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.75)',
                        letterSpacing: '0.02em',
                    }}
                >
                    by
                </span>
                <span
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '10px',
                        color: '#FFFFFF',
                        letterSpacing: '0.04em',
                    }}
                >
                    MindNT
                </span>
            </a>
        </div>
    );
};

export default Welcome;
