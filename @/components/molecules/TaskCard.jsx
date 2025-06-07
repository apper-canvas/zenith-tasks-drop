import React from 'react';
import { motion } from 'framer-motion';
import { format, isToday, isPast, parseISO } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Mark from '@/components/atoms/Mark';

const TaskCard = ({ task, onTaskComplete, onTaskDelete, searchQuery, index, onDragStart, onDragEnd, ...props }) => {
    const getPriorityWeight = (priority) => {
        switch (priority) {
            case 'high': return 'shadow-brutal-high border-structure';
            case 'medium': return 'shadow-brutal-medium border-structure';
            case 'low': return 'shadow-brutal-low border-structure';
            default: return 'shadow-brutal-low border-structure';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-surface-50';
            case 'medium': return 'border-surface-400';
            case 'low': return 'border-surface-600';
            default: return 'border-surface-600';
        }
    };

    const getTaskStatus = (task) => {
        if (task.completed) return 'completed';
        if (task.dueDate && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate))) return 'overdue';
        if (task.dueDate && isToday(parseISO(task.dueDate))) return 'due-today';
        return 'normal';
    };

    const highlightSearchMatch = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);
        
        return parts.map((part, i) => 
            regex.test(part) ? (
                <Mark key={i}>{part}</Mark>
            ) : part
        );
    };

    const status = getTaskStatus(task);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-surface-900 concrete-texture ${getPriorityWeight(task.priority)} 
                     ${getPriorityColor(task.priority)} ${
                task.completed ? 'opacity-60' : ''
            } ${status === 'overdue' ? 'border-accent' : ''}`}
            draggable
            onDragStart={() => onDragStart(task)}
            onDragEnd={onDragEnd}
            {...props}
        >
            <div className="p-6">
                <div className="flex items-start gap-4">
                    {/* Completion Checkbox */}
                    <Button
                        onClick={() => onTaskComplete(task.id)}
                        className={`w-6 h-6 border-structure border-surface-600 hover:border-surface-50 
                                   transition-brutal flex items-center justify-center ${
                            task.completed ? 'bg-surface-50 border-surface-50' : ''
                        }`}
                        style={{ borderRadius: '50%' }}
                    >
                        {task.completed && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-black"
                            >
                                <ApperIcon name="Check" className="w-4 h-4" />
                            </motion.div>
                        )}
                    </Button>

                    {/* Task Content */}
                    <div className="flex-1">
                        <h3 className={`text-heading font-display mb-2 ${
                            task.completed ? 'line-through text-surface-400' : 'text-surface-50'
                        }`}>
                            {highlightSearchMatch(task.title, searchQuery)}
                        </h3>
                        
                        {task.description && (
                            <p className={`text-surface-300 mb-3 ${
                                task.completed ? 'line-through' : ''
                            }`}>
                                {highlightSearchMatch(task.description, searchQuery)}
                            </p>
                        )}

                        {/* Task Meta */}
                        <div className="flex items-center gap-6 text-sm font-mono">
                            <span className={`text-caps ${
                                task.priority === 'high' ? 'text-surface-50' :
                                task.priority === 'medium' ? 'text-surface-300' :
                                'text-surface-400'
                            }`}>
                                {task.priority}
                            </span>
                            
                            {task.dueDate && (
                                <span className={`${
                                    status === 'overdue' ? 'text-accent' :
                                    status === 'due-today' ? 'text-surface-50' :
                                    'text-surface-400'
                                }`}>
                                    {isToday(parseISO(task.dueDate)) ? 'DUE TODAY' : 
                                     format(parseISO(task.dueDate), 'MMM dd, yyyy')}
                                </span>
                            )}
                            
                            <span className="text-surface-500">
                                {format(new Date(task.createdAt), 'MMM dd')}
                            </span>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <Button
                        onClick={() => onTaskDelete(task.id)}
                        className="text-surface-600 hover:text-accent hover:scale-110 transition-brutal p-2"
                    >
                        <ApperIcon name="X" className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskCard;