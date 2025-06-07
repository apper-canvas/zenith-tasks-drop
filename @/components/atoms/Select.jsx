import React from 'react';

const Select = ({ value, onChange, className, children, id, ...props }) => {
    return (
        <select
            id={id}
            value={value}
            onChange={onChange}
            className={`w-full bg-surface-800 text-surface-50 px-4 py-2 border-structure 
                        border-surface-600 focus:border-surface-50 outline-none 
                        font-mono transition-brutal ${className || ''}`}
            {...props}
        >
            {children}
        </select>
    );
};

export default Select;