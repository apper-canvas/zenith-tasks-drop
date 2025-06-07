import React from 'react';

const Kbd = ({ children, className, ...props }) => {
    return (
        <kbd
            className={`bg-surface-800 px-2 py-1 border border-surface-600 ${className || ''}`}
            {...props}
        >
            {children}
        </kbd>
    );
};

export default Kbd;