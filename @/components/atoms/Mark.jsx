import React from 'react';

const Mark = ({ children, className, ...props }) => {
    return (
        <mark
            className={`bg-surface-600 text-surface-50 px-1 ${className || ''}`}
            {...props}
        >
            {children}
        </mark>
    );
};

export default Mark;