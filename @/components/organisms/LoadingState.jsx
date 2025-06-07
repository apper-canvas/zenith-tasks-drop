import React from 'react';
import { motion } from 'framer-motion';

const LoadingState = ({ ...props }) => {
    return (
        <div className="min-h-screen bg-black" {...props}>
            <div className="border-b-structure border-surface-700 p-brutal">
                <div className="animate-pulse">
                    <div className="h-12 bg-surface-800 w-64"></div>
                </div>
            </div>
            <div className="p-brutal space-y-brutal">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface-800 h-24 border-structure border-surface-700 shadow-concrete"
                    >
                        <div className="animate-pulse p-6 space-y-3">
                            <div className="h-4 bg-surface-700 w-3/4"></div>
                            <div className="h-4 bg-surface-700 w-1/2"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LoadingState;