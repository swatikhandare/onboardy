import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '../assets/search.icon'
import AddStudentPopup from '../components/AddStudentPopup'
import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import SearchBar from '../components/SearchBar'
import StudentCard from '../components/StudentCard'
import StudentPopup from '../components/StudentPopup'
import TaskPopup from '../components/TaskPopup'
import Typography from '../components/Typography'
import { findAndReplaceInArrayByID } from '../helpers'
import AssignedTask from '../models/AssignedTask'
import Student from '../models/Student'
import Tag from '../models/Tag'
import { useStudentsStore } from '../stores'

const StyledStudents = styled.div`
  .controls-bar {
    display: flex;
    gap: 15px;
    margin-bottom: 32px;
  }

  .students-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
  }
`


const sortStudents = (students: Student[], sort: string) => {
  return students.sort((a: any, b: any) =>  typeof a[sort] === 'number' ? a-b : a[sort].localeCompare(b[sort]) )
}

const Students: React.FunctionComponent = () => {
  const students = useStudentsStore((state) => state.students);
  const getStudents = useStudentsStore((state) => state.getStudents);
  const addStudent = useStudentsStore((state) => state.addStudent);
  const removeStudent = useStudentsStore((state) => state.removeStudent);
  const editStudent = useStudentsStore((state) => state.editStudent);

  useEffect(() => {
    getStudents();
  }, [])
  
  const [studentsList, setStudentsList] = useState<Student[]>([]);

  useEffect(() => {
    setStudentsList(students)
  }, [students])

  const [sort, setSort] = useState('firstName');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedAssignedTask, setSelectedAssignedTask] = useState<AssignedTask | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentsList(sortStudents(students.filter((student) => 
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(e.target.value.toLowerCase()) ||
      student.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      student.tags.reduce((a,t) => a + ' ' + t.label,'').toLowerCase().includes(e.target.value.toLowerCase())
    ), sort))
  }

  const handleStudentAdd = async (student: Student) => {
    await addStudent(student);
  }

  const handleStudentDelete = async (id: string) => {
    await removeStudent(id);
  }

  const handleSortChange = (value: string) => {
    setSort(value)
  }

  const handleAssignedTaskUpdate = (update: any) => {
    if (!selectedAssignedTask || !selectedStudent) return;
    const updatedAssignedTask = {...selectedAssignedTask, ...update };
    const updatedAssignedTasks = findAndReplaceInArrayByID(selectedStudent.assignedTasks || [], selectedAssignedTask.id, updatedAssignedTask)
    const updatedStudent = {...selectedStudent, assignedTasks: updatedAssignedTasks}
    setSelectedAssignedTask(updatedAssignedTask);
    editStudent(updatedStudent);
    setSelectedStudent(updatedStudent);
  }


  useEffect(() => {
    setStudentsList(sortStudents(students, sort))
  }, [sort])

  return (
    <StyledStudents>
      <div className='controls-bar'>
        <SearchBar placeholder='Search students here...' onChange={handleSearch} />
        <div style={{ display: "flex", alignItems: "center", gap: "10px"}}>
          <Typography size={14} weight="600">Sort by </Typography>
          <Dropdown onChange={handleSortChange} options={[
            { label: "First name", value: "firstName" },
            { label: "Last name", value: "lastName" },
            { label: "Tasks completion", value: "tasksCompletion" }
          ]} />
        </div>
        <Button onClick={() => setIsAdding(true)}>Add Student</Button>
      </div>
      <div className='students-container'>
        {studentsList.map((student) => (
          <StudentCard key={student.id} onClick={() => setSelectedStudent(student)} student={student} />
        ))}
      </div>

      {selectedStudent && <StudentPopup student={selectedStudent} onAssignedTaskSelect={(assignedTask) => setSelectedAssignedTask(assignedTask)} onStudentDelete={handleStudentDelete} onClose={() => setSelectedStudent(null)}/>}
      {selectedAssignedTask && <TaskPopup assignedTask={selectedAssignedTask} onClose={() => setSelectedAssignedTask(null)} onAssignedTaskChange={handleAssignedTaskUpdate} />}
      {isAdding && <AddStudentPopup onCreate={handleStudentAdd} onClose={() => setIsAdding(false)} />}
    </StyledStudents>
  )
}

export default Students