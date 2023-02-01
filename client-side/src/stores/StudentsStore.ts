import { create } from 'zustand'
import { createStudent, deleteStudent, fetchStudents, updateStudent } from '../APIs/studentsApi'
import Student from '../models/Student'

interface StudentState {
  students: Student[]
  getStudents: () => void
  addStudent: (student: Student) => void
  editStudent: (updatedStudent: Student) => void
  removeStudent: (id: string) => void
}

// const _defaultStudents = (defaultStudents as any).map((student) => ({...student, tasksCompletion: Math.floor(Math.random() * 100)}))

const useStudentsStore = create<StudentState>((set, get) => ({
  students: [],
  getStudents: async () => {
    const students = await fetchStudents();
    set({ students })
  },
  addStudent: async (student) => {
    await createStudent(student);
    get().getStudents();
  },
  editStudent: async (updatedStudent) => {
    await updateStudent(updatedStudent);
    get().getStudents();

  },
  removeStudent: async (id) => {
    await deleteStudent(id);
    get().getStudents();
  },
}))

export default useStudentsStore