import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({ type = 'no-tasks', onActionClick, ...props }) => {
    let iconName, title, description, buttonLabel;

    if (type === 'no-tasks') {
        iconName = 'Square';
        title = 'NO TASKS EXIST';
        description = 'THE SYSTEM IS EMPTY. INITIATE TASK CREATION TO BEGIN PRODUCTIVITY OPERATIONS.';
        buttonLabel = 'CREATE FIRST TASK';
    } else if (type === 'no-matches') {
        iconName = 'Search';
        title = 'NO MATCHES FOUND';
        description = 'NO TASKS MATCH THE CURRENT SEARCH CRITERIA';
        buttonLabel = null;
    }

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-24"
            {...props}
        >
            {type === 'no-tasks' ? (
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    <ApperIcon name={iconName} className="w-24 h-24 text-surface-600 mx-auto mb-brutal" />
                </motion.div>
            ) : (
                <ApperIcon name={iconName} className="w-16 h-16 text-surface-600 mx-auto mb-4" />
            )}
            
            <h2 className="text-title font-display text-caps mb-4">{title}</h2>
            <p className="text-surface-400 mb-brutal max-w-md mx-auto font-mono">
                {description}
            </p>
            {buttonLabel && (
                <Button
                    onClick={onActionClick}
                    className="bg-surface-800 text-surface-50 px-8 py-4 border-structure border-surface-600 
                             hover:border-surface-50 hover:shadow-brutal-medium transition-brutal"
                >
                    {buttonLabel}
                </Button>
            )}
        </motion.div>
    );
};

export default EmptyState;