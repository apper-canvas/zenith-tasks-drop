import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const Header = ({ searchQuery, onSearchChange, onShowShortcuts, ...props }) => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="border-b-structure border-surface-700 bg-surface-900 concrete-texture sticky top-0 z-40"
            {...props}
        >
            <div className="p-brutal flex items-center justify-between">
                <h1 className="text-display font-display text-caps">ZENITH TASKS</h1>
                <div className="flex items-center gap-brutal">
                    {/* Search Bar */}
                    <div className="relative">
                        <Input
                            id="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={onSearchChange}
                            placeholder="SEARCH TASKS [CTRL+K]"
                            className="px-6 py-3 w-96"
                        />
                        <ApperIcon 
                            name="Search" 
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" 
                        />
                    </div>
                    
                    {/* Keyboard Shortcuts Button */}
                    <Button
                        onClick={onShowShortcuts}
                        className="bg-surface-800 text-surface-50 p-3 border-structure border-surface-600 
                                 hover:border-surface-50 hover:shadow-brutal-low transition-brutal"
                    >
                        <ApperIcon name="Keyboard" className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;