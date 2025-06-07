import React from 'react';
import Button from '@/components/atoms/Button';

const ListButton = ({ name, count, isSelected, onClick, ...props }) => {
    const className = `w-full text-left px-4 py-3 border-structure transition-brutal ${
        isSelected 
            ? 'bg-surface-800 border-surface-50 text-surface-50' 
            : 'border-surface-600 text-surface-300 hover:border-surface-400'
    }`;
    
    return (
        <Button onClick={onClick} className={className} {...props}>
            {name.toUpperCase()} {count !== undefined && `(${count})`}
        </Button>
    );
};

export default ListButton;