import { create } from 'zustand'
import { createStudent, deleteStudent, fetchStudents, updateStudent } from '../APIs/studentsApi'
import Student from '../models/Student'

interface StudentState {
  students: Student[]
  getStudents: () => void
  addStudent: (student: Student) => void
  editStudent: (updatedStudent: Student) => void
  removeStudent: (id: string) => void
  getStudentById: (id: string) => Student | null
}

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
  getStudentById: (id) => {
    const matchedStudent = get().students.find((student) => student.id === id);
    if (!matchedStudent) return null;
    return matchedStudent;
  },
}))

export default useStudentsStore