import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import KeyboardShortcutDisplay from '@/components/molecules/KeyboardShortcutDisplay';

const KeyboardShortcutsModal = ({ show, onClose, ...props }) => {
    return (
        <AnimatePresence>
            {show && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-brutal"
                        {...props}
                    >
                        <div className="bg-surface-900 border-structure border-surface-600 shadow-concrete 
                                      max-w-md w-full p-brutal concrete-texture">
                            <h3 className="text-heading font-display text-caps mb-6">KEYBOARD SHORTCUTS</h3>
                            <div className="space-y-4 font-mono text-sm">
                                <KeyboardShortcutDisplay label="SEARCH" shortcut="CTRL+K" />
                                <KeyboardShortcutDisplay label="NEW TASK" shortcut="CTRL+N" />
                                <KeyboardShortcutDisplay label="SHORTCUTS" shortcut="CTRL+/" />
                                <KeyboardShortcutDisplay label="CLOSE" shortcut="ESC" />
                            </div>
                            <Button
                                onClick={onClose}
                                className="mt-6 w-full bg-surface-800 text-surface-50 py-3 border-structure 
                                         border-surface-600 hover:border-surface-50 transition-brutal"
                            >
                                CLOSE
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default KeyboardShortcutsModal;