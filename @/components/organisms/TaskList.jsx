import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import EmptyState from '@/components/molecules/EmptyState';

const TaskList = ({ tasks, searchQuery, onTaskComplete, onTaskDelete, onNoTasksAction, ...props }) => {
    const [draggedTask, setDraggedTask] = useState(null);

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (a.priority !== b.priority) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        
        if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if (tasks.length === 0 && !searchQuery) {
        return (
            <div className="p-brutal">
                <EmptyState type="no-tasks" onActionClick={onNoTasksAction} />
            </div>
        );
    }
    
    return (
        <div className="p-brutal" {...props}>
            <div className="ascii-divider"></div>
            <div className="space-y-4 pt-4">
                <AnimatePresence mode="popLayout">
                    {sortedTasks.map((task, index) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onTaskComplete={onTaskComplete}
                            onTaskDelete={onTaskDelete}
                            searchQuery={searchQuery}
                            index={index}
                            onDragStart={setDraggedTask}
                            onDragEnd={() => setDraggedTask(null)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {tasks.length > 0 && sortedTasks.length === 0 && (
                <EmptyState type="no-matches" />
            )}
        </div>
    );
};

export default TaskList;