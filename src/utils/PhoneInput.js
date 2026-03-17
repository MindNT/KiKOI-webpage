import React from 'react';

const PhoneInput = ({ value, onChange, placeholder, type = "tel", className = "", ...props }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
                w-[220px] sm:w-[265px]
                h-[38px] sm:h-[40px]
                bg-[#F5F5F5]
                rounded-[10px]
                font-sans font-normal text-base leading-[19px]
                text-left px-3 placeholder-[#191F26] text-[#191F26]
                focus:outline-none focus:ring-2 focus:ring-[#CE5C28]
                transition-all
                ${className}
            `}
            {...props}
        />
    );
};

export default PhoneInput;
