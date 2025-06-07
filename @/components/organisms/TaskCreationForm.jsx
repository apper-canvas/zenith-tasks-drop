import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';

const TaskCreationForm = ({ lists, onSubmit, onCancel, showForm, onToggleForm, ...props }) => {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        listId: 'default'
    });

    useEffect(() => {
        if (!showForm) {
            setNewTask({
                title: '',
                description: '',
                priority: 'medium',
                dueDate: '',
                listId: 'default'
            });
        }
    }, [showForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        onSubmit({
            ...newTask,
            dueDate: newTask.dueDate || null
        });
    };

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-brutal"
            {...props}
        >
            {!showForm ? (
                <Button
                    onClick={onToggleForm}
                    className="w-full bg-surface-900 text-surface-400 px-6 py-4 border-structure border-surface-600 
                             hover:border-surface-50 hover:text-surface-50 transition-brutal text-left 
                             concrete-texture"
                >
                    <div className="flex items-center gap-4">
                        <ApperIcon name="Plus" className="w-6 h-6" />
                        <span className="font-mono">ADD NEW TASK [CTRL+N]</span>
                    </div>
                </Button>
            ) : (
                <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-surface-900 border-structure border-surface-600 concrete-texture"
                >
                    <div className="p-6 space-y-4">
                        <FormField label="Task Title">
                            <Input
                                type="text"
                                value={newTask.title}
                                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="TASK TITLE"
                                autoFocus
                                id="task-title-input"
                            />
                        </FormField>

                        <FormField label="Task Description" className="pt-0">
                            <Input
                                type="textarea"
                                value={newTask.description}
                                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="TASK DESCRIPTION (OPTIONAL)"
                                rows={3}
                                id="task-description-input"
                            />
                        </FormField>

                        <div className="grid grid-cols-3 gap-4">
                            <FormField label="Priority">
                                <div className="flex gap-2">
                                    {['high', 'medium', 'low'].map(priority => (
                                        <Button
                                            key={priority}
                                            type="button"
                                            onClick={() => setNewTask(prev => ({ ...prev, priority }))}
                                            className={`px-4 py-2 border-structure transition-brutal text-caps font-mono text-sm ${
                                                newTask.priority === priority
                                                    ? 'bg-surface-800 border-surface-50 text-surface-50'
                                                    : 'border-surface-600 text-surface-400 hover:border-surface-400'
                                            }`}
                                        >
                                            {priority}
                                        </Button>
                                    ))}
                                </div>
                            </FormField>

                            <FormField label="Due Date">
                                <Input
                                    type="date"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                                    id="task-due-date-input"
                                />
                            </FormField>

                            <FormField label="List">
                                <Select
                                    value={newTask.listId}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, listId: e.target.value }))}
                                    id="task-list-select"
                                >
                                    <option value="default">DEFAULT</option>
                                    {lists.map(list => (
                                        <option key={list.id} value={list.id}>
                                            {list.name.toUpperCase()}
                                        </option>
                                    ))}
                                </Select>
                            </FormField>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={!newTask.title.trim()}
                                className="flex-1 bg-surface-800 text-surface-50 py-3 border-structure 
                                         border-surface-600 hover:border-surface-50 disabled:opacity-50 
                                         disabled:cursor-not-allowed transition-brutal"
                            >
                                CREATE TASK
                            </Button>
                            <Button
                                type="button"
                                onClick={onCancel}
                                className="px-8 py-3 border-structure border-surface-600 text-surface-400 
                                         hover:border-surface-400 hover:text-surface-50 transition-brutal"
                            >
                                CANCEL
                            </Button>
                        </div>
                    </div>
                </motion.form>
            )}
        </motion.div>
    );
};

export default TaskCreationForm;