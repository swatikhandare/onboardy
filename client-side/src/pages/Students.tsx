import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '../assets/search.icon'
import AddStudentPopup from '../components/AddStudentPopup'
import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import SearchBar from '../components/SearchBar'
import StudentCard from '../components/StudentCard'
import StudentPopup from '../components/StudentPopup'
import Typography from '../components/Typography'
import Student from '../models/Student'
import Tag from '../models/Tag'
import { useStudentsStore } from '../stores'

const StyledStudents = styled.div`
  .controls {
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


  useEffect(() => {
    setStudentsList(sortStudents(students, sort))
  }, [sort])

  return (
    <StyledStudents>
      <div className='controls'>
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

      {selectedStudent && <StudentPopup student={selectedStudent} onStudentDelete={handleStudentDelete} onClose={() => setSelectedStudent(null)}/>}
      {isAdding && <AddStudentPopup onCreate={handleStudentAdd} onClose={() => setIsAdding(false)} />}
    </StyledStudents>
  )
}

export default Students