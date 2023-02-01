import AssignedTask from "../models/AssignedTask";
import Task from "../models/Task"
import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";
import { fetchStudents, updateStudent } from "./studentsApi";

const fetchTasks = async (): Promise<Task[]> => {
  return getResourceFromLocalStorage<Task[]>("tasks");
}

const createTask = async (task: Task)  => {
  const tasks = getResourceFromLocalStorage<Task[]>("tasks");
  setResourceAtLocalStorage<Task[]>("tasks", [task, ...tasks]);
  matchTaskToStudents(task);
}

const deleteTask = async (taskId: string) => {
  const tasks = getResourceFromLocalStorage<Task[]>("tasks") as Task[];
  setResourceAtLocalStorage<Task[]>("tasks", [...tasks.filter((task) => task.id !== taskId)]);
  removeTaskFromStudents(taskId);
}

const updateTask = async (updatedTask: Task) => {
  const tasks = getResourceFromLocalStorage<Task[]>("tasks");
  const targetIndex = tasks.findIndex(task => task.id === updatedTask.id);
  const updatedTasks = tasks.slice();
  updatedTasks[targetIndex] = updatedTask;
  setResourceAtLocalStorage<Task[]>("tasks", updatedTasks);
  matchTaskToStudents(updatedTask);
}


const matchTaskToStudents = async (task: Task) => {
  const students = await fetchStudents();
  const matchedStudents = students.filter(student => task.tags.every(tag => student.tags.some( t => t.id === tag.id)));
  
  matchedStudents.forEach(student => {
    const newAssignedTask: AssignedTask = {
      id: crypto.randomUUID(),
      refId: crypto.randomUUID(),
      task,
      studentId: student.id,
      isDone: false,
      messages: []
    }

    student.assignedTasks = [...student.assignedTasks || [], newAssignedTask];
    updateStudent(student);
  })
}

const removeTaskFromStudents = async (taskId: string) => {
  const students = await fetchStudents();
  const matchedStudents = students.filter(student => student.assignedTasks?.some(aTask => aTask.task.id === taskId));

  matchedStudents.forEach(async student => {
    student.assignedTasks = [...(student.assignedTasks || []).filter(aTask => aTask.task.id !== taskId )]
    updateStudent(student);
  })
}

export { fetchTasks, createTask, deleteTask, updateTask }
