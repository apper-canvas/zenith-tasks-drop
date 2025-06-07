import React from 'react';

const FormField = ({ label, children, className, id, ...props }) => {
    return (
        <div className={className} {...props}>
            <label htmlFor={id} className="block text-caps text-surface-400 mb-2 font-mono text-sm">
                {label.toUpperCase()}
            </label>
            {children}
        </div>
    );
};

export default FormField;