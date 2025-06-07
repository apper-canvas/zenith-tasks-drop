import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className, autoFocus, rows, id, ...props }) => {
    const commonProps = {
        value,
        onChange,
        placeholder,
        className: `w-full bg-surface-800 text-surface-50 px-4 py-3 border-structure 
                    border-surface-600 focus:border-surface-50 outline-none 
                    placeholder-surface-400 font-mono transition-brutal ${className || ''}`,
        id,
        ...props
    };

    if (type === 'textarea') {
        return (
            <textarea
                rows={rows || 3}
                {...commonProps}
                className={`${commonProps.className} resize-none`}
            />
        );
    }

    return (
        <input
            type={type}
            autoFocus={autoFocus}
            {...commonProps}
        />
    );
};

export default Input;