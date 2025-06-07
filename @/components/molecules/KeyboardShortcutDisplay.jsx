import React from 'react';
import Kbd from '@/components/atoms/Kbd';

const KeyboardShortcutDisplay = ({ label, shortcut, ...props }) => {
    return (
        <div className="flex justify-between" {...props}>
            <span>{label.toUpperCase()}:</span>
            <Kbd>{shortcut}</Kbd>
        </div>
    );
};

export default KeyboardShortcutDisplay;