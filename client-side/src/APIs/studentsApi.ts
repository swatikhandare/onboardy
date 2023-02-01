import AssignedTask from "../models/AssignedTask";
import Student from "../models/Student"
import Tasks from "../pages/Tasks";
import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";

const fetchStudents = async (): Promise<Student[]> => {
  const students = getResourceFromLocalStorage<Student[]>("students");
  return students.map((student) => ({...student, tasksCompletion: calculateTaskCompletion(student.assignedTasks || []) }));
}

const createStudent = async (student: Student) => {
  const students = getResourceFromLocalStorage<Student[]>("students");
  setResourceAtLocalStorage<Student[]>("students", [student, ...students]);
}

const deleteStudent = async (id: string) => {
  const students = getResourceFromLocalStorage<Student[]>("students");
  setResourceAtLocalStorage<Student[]>("students", [...students.filter((student) => student.id !== id)]);
}

const updateStudent = async (updatedStudent: Student) => {
  const students = getResourceFromLocalStorage<Student[]>("students");
  const targetIndex = students.findIndex(student => student.id === updatedStudent.id);
  const updatedStudents = students.slice();
  updatedStudents[targetIndex] = updatedStudent;
  setResourceAtLocalStorage<Student[]>("students", updatedStudents);
}

const calculateTaskCompletion = (assignedTasks: AssignedTask[]) => {
  if(!assignedTasks.length) return 0;
  const completedTasks = assignedTasks.filter(aTask => aTask.isDone);
  return (completedTasks.length / assignedTasks.length) * 100;
}

export { fetchStudents, createStudent, deleteStudent, updateStudent }
