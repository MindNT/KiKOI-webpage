import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "Buscar", className = "" }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
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
                    paddingLeft: '16px',
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
