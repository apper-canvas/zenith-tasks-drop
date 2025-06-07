import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { taskService } from '@/services';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import TaskCreationForm from '@/components/organisms/TaskCreationForm';
import TaskList from '@/components/organisms/TaskList';
import KeyboardShortcutsModal from '@/components/organisms/KeyboardShortcutsModal';
import { isToday, parseISO } from 'date-fns';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

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
          case 'n':
            e.preventDefault();
            setShowCreateForm(true);
            break;
        }
      }
      if (e.key === 'Escape') {
        setShowKeyboardShortcuts(false);
        setShowCreateForm(false);
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
      setShowCreateForm(false);
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

  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    return isToday(parseISO(task.dueDate));
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesList = selectedList === 'all' || task.listId === selectedList;
    return matchesSearch && matchesList;
  });

  const displayTasks = selectedList === 'today' ? todayTasks : filteredTasks;

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadData} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onShowShortcuts={() => setShowKeyboardShortcuts(true)}
      />

      <div className="grid grid-cols-12 min-h-screen">
        <Sidebar
          lists={lists}
          tasks={tasks}
          todayTasksCount={todayTasks.length}
          selectedList={selectedList}
          onSelect={setSelectedList}
        />

        <main className="col-span-9 bg-black">
          <TaskCreationForm
            lists={lists}
            onSubmit={handleTaskCreate}
            onCancel={() => setShowCreateForm(false)}
            showForm={showCreateForm}
            onToggleForm={() => setShowCreateForm(true)}
          />
          <TaskList
            tasks={displayTasks}
            searchQuery={searchQuery}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleTaskDelete}
            onNoTasksAction={() => setShowCreateForm(true)}
          />
        </main>
      </div>

      <KeyboardShortcutsModal
        show={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
    </div>
  );
};

export default HomePage;