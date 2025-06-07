import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isPast, parseISO } from 'date-fns';
import ApperIcon from './ApperIcon';

const MainFeature = ({ 
  tasks, 
  lists, 
  onTaskCreate, 
  onTaskComplete, 
  onTaskDelete, 
  searchQuery 
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    listId: 'default'
  });
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    const handleKeyboard = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setShowCreateForm(true);
      }
      if (e.key === 'Escape') {
        setShowCreateForm(false);
        setNewTask({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: '',
          listId: 'default'
        });
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    onTaskCreate({
      ...newTask,
      dueDate: newTask.dueDate || null
    });

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      listId: 'default'
    });
    setShowCreateForm(false);
  };

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
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-surface-600 text-surface-50 px-1">
          {part}
        </mark>
      ) : part
    );
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sort by priority: high -> medium -> low
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Sort by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    // Sort by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (tasks.length === 0 && !showCreateForm) {
    return (
      <div className="p-brutal">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-24"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Square" className="w-24 h-24 text-surface-600 mx-auto mb-brutal" />
          </motion.div>
          <h2 className="text-title font-display text-caps mb-4">NO TASKS EXIST</h2>
          <p className="text-surface-400 mb-brutal max-w-md mx-auto font-mono">
            THE SYSTEM IS EMPTY. INITIATE TASK CREATION TO BEGIN PRODUCTIVITY OPERATIONS.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateForm(true)}
            className="bg-surface-800 text-surface-50 px-8 py-4 border-structure border-surface-600 
                     hover:border-surface-50 hover:shadow-brutal-medium transition-brutal"
          >
            CREATE FIRST TASK
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-brutal">
      {/* Task Creation Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-brutal"
      >
        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-surface-900 text-surface-400 px-6 py-4 border-structure border-surface-600 
                     hover:border-surface-50 hover:text-surface-50 transition-brutal text-left 
                     concrete-texture"
          >
            <div className="flex items-center gap-4">
              <ApperIcon name="Plus" className="w-6 h-6" />
              <span className="font-mono">ADD NEW TASK [CTRL+N]</span>
            </div>
          </button>
        ) : (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="bg-surface-900 border-structure border-surface-600 concrete-texture"
          >
            <div className="p-6 space-y-4">
              {/* Title Input */}
              <div>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="TASK TITLE"
                  className="w-full bg-surface-800 text-surface-50 px-4 py-3 border-structure 
                           border-surface-600 focus:border-surface-50 outline-none 
                           placeholder-surface-400 font-mono transition-brutal"
                  autoFocus
                />
              </div>

              {/* Description Input */}
              <div>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="TASK DESCRIPTION (OPTIONAL)"
                  rows={3}
                  className="w-full bg-surface-800 text-surface-50 px-4 py-3 border-structure 
                           border-surface-600 focus:border-surface-50 outline-none 
                           placeholder-surface-400 font-mono transition-brutal resize-none"
                />
              </div>

              {/* Priority and Date Row */}
              <div className="grid grid-cols-3 gap-4">
                {/* Priority Selector */}
                <div>
                  <label className="block text-caps text-surface-400 mb-2 font-mono text-sm">
                    PRIORITY
                  </label>
                  <div className="flex gap-2">
                    {['high', 'medium', 'low'].map(priority => (
                      <button
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
                      </button>
                    ))}
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-caps text-surface-400 mb-2 font-mono text-sm">
                    DUE DATE
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full bg-surface-800 text-surface-50 px-4 py-2 border-structure 
                             border-surface-600 focus:border-surface-50 outline-none 
                             font-mono transition-brutal"
                  />
                </div>

                {/* List Selector */}
                <div>
                  <label className="block text-caps text-surface-400 mb-2 font-mono text-sm">
                    LIST
                  </label>
                  <select
                    value={newTask.listId}
                    onChange={(e) => setNewTask(prev => ({ ...prev, listId: e.target.value }))}
                    className="w-full bg-surface-800 text-surface-50 px-4 py-2 border-structure 
                             border-surface-600 focus:border-surface-50 outline-none 
                             font-mono transition-brutal"
                  >
                    <option value="default">DEFAULT</option>
                    {lists.map(list => (
                      <option key={list.id} value={list.id}>
                        {list.name.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={!newTask.title.trim()}
                  className="flex-1 bg-surface-800 text-surface-50 py-3 border-structure 
                           border-surface-600 hover:border-surface-50 disabled:opacity-50 
                           disabled:cursor-not-allowed transition-brutal"
                >
                  CREATE TASK
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewTask({
                      title: '',
                      description: '',
                      priority: 'medium',
                      dueDate: '',
                      listId: 'default'
                    });
                  }}
                  className="px-8 py-3 border-structure border-surface-600 text-surface-400 
                           hover:border-surface-400 hover:text-surface-50 transition-brutal"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </motion.div>

      {/* ASCII Divider */}
      <div className="ascii-divider"></div>

      {/* Tasks List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {sortedTasks.map((task, index) => {
            const status = getTaskStatus(task);
            
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-surface-900 concrete-texture ${getPriorityWeight(task.priority)} 
                         ${getPriorityColor(task.priority)} ${
                  task.completed ? 'opacity-60' : ''
                } ${status === 'overdue' ? 'border-accent' : ''}`}
                draggable
                onDragStart={() => setDraggedTask(task)}
                onDragEnd={() => setDraggedTask(null)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Completion Checkbox */}
                    <button
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
                    </button>

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
                    <button
                      onClick={() => onTaskDelete(task.id)}
                      className="text-surface-600 hover:text-accent hover:scale-110 transition-brutal p-2"
                    >
                      <ApperIcon name="X" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty Search Results */}
      {tasks.length > 0 && sortedTasks.length === 0 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <ApperIcon name="Search" className="w-16 h-16 text-surface-600 mx-auto mb-4" />
          <h3 className="text-heading font-display text-caps mb-2">NO MATCHES FOUND</h3>
          <p className="text-surface-400 font-mono">
            NO TASKS MATCH THE CURRENT SEARCH CRITERIA
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MainFeature;