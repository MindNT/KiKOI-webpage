import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "Buscar", className = "" }) => {
    return (
        <div className={`relative flex items-center ${className}`}>
            {/* Orange search icon */}
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
                    left: '14px',
                    zIndex: 1,
                    pointerEvents: 'none',
                    flexShrink: 0
                }}
            >
                <circle cx="11" cy="11" r="7" stroke="#E36414" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M16.5 16.5L21 21" stroke="#E36414" strokeWidth="2.2" strokeLinecap="round" />
            </svg>

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    height: '40px',
                    background: '#F5F5F5',
                    borderRadius: '25px',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#535353',
                    paddingLeft: '42px',
                    paddingRight: '16px',
                    border: 'none',
                    outline: 'none'
                }}
                className="transition-colors focus:ring-2 focus:ring-[#CE5C28]"
            />
        </div>
    );
};

export default SearchBar;

