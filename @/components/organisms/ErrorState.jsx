import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorState = ({ error, onRetry, ...props }) => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center" {...props}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-brutal"
            >
                <ApperIcon name="AlertTriangle" className="w-16 h-16 text-accent mx-auto mb-6" />
                <h2 className="text-title font-display text-caps mb-4">SYSTEM ERROR</h2>
                <p className="text-surface-300 mb-6">{error}</p>
                <Button
                    onClick={onRetry}
                    className="bg-surface-800 text-surface-50 px-8 py-4 border-structure border-surface-600 
                             hover:border-surface-50 hover:shadow-brutal-medium transition-brutal"
                >
                    RETRY OPERATION
                </Button>
            </motion.div>
        </div>
    );
};

export default ErrorState;