import tasksData from '../mockData/tasks.json';
import listsData from '../mockData/lists.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
    this.lists = [...listsData];
  }

  async getAll() {
    await delay(300);
    return [...this.tasks];
  }

  async getById(id) {
    await delay(200);
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    return { ...task };
  }

  async getAllLists() {
    await delay(250);
    return [...this.lists];
  }

  async create(taskData) {
    await delay(400);
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.unshift(newTask);
    return { ...newTask };
  }

  async update(id, taskData) {
    await delay(350);
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    this.tasks[index] = { ...this.tasks[index], ...taskData };
    return { ...this.tasks[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    this.tasks.splice(index, 1);
    return true;
  }

  async getTasksByList(listId) {
    await delay(250);
    return this.tasks.filter(t => t.listId === listId);
  }

  async getTasksByPriority(priority) {
    await delay(250);
    return this.tasks.filter(t => t.priority === priority);
  }

  async getTodayTasks() {
    await delay(250);
    const today = new Date().toDateString();
    return this.tasks.filter(t => {
      if (!t.dueDate) return false;
      return new Date(t.dueDate).toDateString() === today;
    });
  }
}

export default new TaskService();