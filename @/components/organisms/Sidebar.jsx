import React from 'react';
import { motion } from 'framer-motion';
import ListButton from '@/components/molecules/ListButton';

const Sidebar = ({ lists, tasks, todayTasksCount, selectedList, onSelect, ...props }) => {
    return (
        <motion.aside
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="col-span-3 bg-surface-900 border-r-structure border-surface-700 concrete-texture"
            {...props}
        >
            <div className="p-brutal">
                <div className="mb-brutal">
                    <h2 className="text-heading font-display text-caps mb-4">LISTS</h2>
                    <div className="space-y-2">
                        <ListButton 
                            name="ALL TASKS" 
                            isSelected={selectedList === 'all'} 
                            onClick={() => onSelect('all')} 
                        />
                        <ListButton 
                            name="TODAY" 
                            count={todayTasksCount} 
                            isSelected={selectedList === 'today'} 
                            onClick={() => onSelect('today')} 
                        />
                        {lists.map(list => (
                            <ListButton
                                key={list.id}
                                name={list.name}
                                isSelected={selectedList === list.id}
                                onClick={() => onSelect(list.id)}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="ascii-divider"></div>
                
                <div>
                    <h3 className="text-caps text-surface-400 mb-4 font-mono text-sm">STATISTICS</h3>
                    <div className="space-y-2 font-mono text-sm">
                        <div className="flex justify-between">
                            <span>TOTAL:</span>
                            <span>{tasks.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>COMPLETED:</span>
                            <span>{tasks.filter(t => t.completed).length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>DUE TODAY:</span>
                            <span>{todayTasksCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;