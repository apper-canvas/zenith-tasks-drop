import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import ApperIcon from '../components/ApperIcon';
import { taskService } from '../services';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            document.getElementById('search-input')?.focus();
            break;
          case '/':
            e.preventDefault();
            setShowKeyboardShortcuts(true);
            break;
        }
      }
      if (e.key === 'Escape') {
        setShowKeyboardShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, listsData] = await Promise.all([
        taskService.getAll(),
        taskService.getAllLists()
      ]);
      setTasks(tasksData);
      setLists(listsData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('SYSTEM FAILURE: Unable to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreate = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('TASK CREATED');
    } catch (err) {
      toast.error('CREATION FAILED');
    }
  };

  const handleTaskComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = await taskService.update(taskId, { ...task, completed: !task.completed });
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      toast.success(updatedTask.completed ? 'TASK COMPLETED' : 'TASK RESTORED');
    } catch (err) {
      toast.error('UPDATE FAILED');
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success('TASK ELIMINATED');
    } catch (err) {
      toast.error('DELETION FAILED');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesList = selectedList === 'all' || task.listId === selectedList;
    return matchesSearch && matchesList;
  });

  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date().toDateString();
    return new Date(task.dueDate).toDateString() === today;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
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
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-brutal"
        >
          <ApperIcon name="AlertTriangle" className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-title font-display text-caps mb-4">SYSTEM ERROR</h2>
          <p className="text-surface-300 mb-6">{error}</p>
          <button
            onClick={loadData}
            className="bg-surface-800 text-surface-50 px-8 py-4 border-structure border-surface-600 
                     hover:border-surface-50 hover:shadow-brutal-medium transition-brutal"
          >
            RETRY OPERATION
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Monolithic Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="border-b-structure border-surface-700 bg-surface-900 concrete-texture sticky top-0 z-40"
      >
        <div className="p-brutal flex items-center justify-between">
          <h1 className="text-display font-display text-caps">ZENITH TASKS</h1>
          <div className="flex items-center gap-brutal">
            {/* Search Bar */}
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH TASKS [CTRL+K]"
                className="bg-surface-800 text-surface-50 px-6 py-3 w-96 border-structure 
                         border-surface-600 focus:border-surface-50 outline-none 
                         placeholder-surface-400 font-mono text-sm transition-brutal"
              />
              <ApperIcon 
                name="Search" 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" 
              />
            </div>
            
            {/* Keyboard Shortcuts */}
            <button
              onClick={() => setShowKeyboardShortcuts(true)}
              className="bg-surface-800 text-surface-50 p-3 border-structure border-surface-600 
                       hover:border-surface-50 hover:shadow-brutal-low transition-brutal"
            >
              <ApperIcon name="Keyboard" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="grid grid-cols-12 min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="col-span-3 bg-surface-900 border-r-structure border-surface-700 concrete-texture"
        >
          <div className="p-brutal">
            <div className="mb-brutal">
              <h2 className="text-heading font-display text-caps mb-4">LISTS</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedList('all')}
                  className={`w-full text-left px-4 py-3 border-structure transition-brutal ${
                    selectedList === 'all' 
                      ? 'bg-surface-800 border-surface-50 text-surface-50' 
                      : 'border-surface-600 text-surface-300 hover:border-surface-400'
                  }`}
                >
                  ALL TASKS
                </button>
                <button
                  onClick={() => setSelectedList('today')}
                  className={`w-full text-left px-4 py-3 border-structure transition-brutal ${
                    selectedList === 'today' 
                      ? 'bg-surface-800 border-surface-50 text-surface-50' 
                      : 'border-surface-600 text-surface-300 hover:border-surface-400'
                  }`}
                >
                  TODAY ({todayTasks.length})
                </button>
                {lists.map(list => (
                  <button
                    key={list.id}
                    onClick={() => setSelectedList(list.id)}
                    className={`w-full text-left px-4 py-3 border-structure transition-brutal ${
                      selectedList === list.id 
                        ? 'bg-surface-800 border-surface-50 text-surface-50' 
                        : 'border-surface-600 text-surface-300 hover:border-surface-400'
                    }`}
                  >
                    {list.name.toUpperCase()}
                  </button>
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
                  <span>{todayTasks.length}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="col-span-9 bg-black">
          <MainFeature
            tasks={selectedList === 'today' ? todayTasks : filteredTasks}
            lists={lists}
            onTaskCreate={handleTaskCreate}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleTaskDelete}
            searchQuery={searchQuery}
          />
        </main>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setShowKeyboardShortcuts(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-brutal"
            >
              <div className="bg-surface-900 border-structure border-surface-600 shadow-concrete 
                            max-w-md w-full p-brutal concrete-texture">
                <h3 className="text-heading font-display text-caps mb-6">KEYBOARD SHORTCUTS</h3>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between">
                    <span>SEARCH:</span>
                    <kbd className="bg-surface-800 px-2 py-1 border border-surface-600">CTRL+K</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>NEW TASK:</span>
                    <kbd className="bg-surface-800 px-2 py-1 border border-surface-600">CTRL+N</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>SHORTCUTS:</span>
                    <kbd className="bg-surface-800 px-2 py-1 border border-surface-600">CTRL+/</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>CLOSE:</span>
                    <kbd className="bg-surface-800 px-2 py-1 border border-surface-600">ESC</kbd>
                  </div>
                </div>
                <button
                  onClick={() => setShowKeyboardShortcuts(false)}
                  className="mt-6 w-full bg-surface-800 text-surface-50 py-3 border-structure 
                           border-surface-600 hover:border-surface-50 transition-brutal"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;