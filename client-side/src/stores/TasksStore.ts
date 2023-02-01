import { create } from 'zustand'
import { createTask, deleteTask, fetchTasks, updateTask } from '../APIs/tasksApi'
import Task from '../models/Task'

interface TaskState {
  tasks: Task[]
  getTasks: () => void
  addTask: (task: Task) => void
  editTask: (updatedTask: Task) => void
  removeTask: (id: string) => void
}

const useTasksStore = create<TaskState>((set, get) => ({
  tasks: [],
  getTasks: async () => {
    const tasks = await fetchTasks();
    set({ tasks })
  },
  addTask: async (task) => {
    await createTask(task);
    get().getTasks();
  },
  editTask: async (updatedTask) => {
    await updateTask(updatedTask);
    get().getTasks();
  },
  removeTask: async (id) => {
    await deleteTask(id);
    get().getTasks();
  },
}))

export default useTasksStore