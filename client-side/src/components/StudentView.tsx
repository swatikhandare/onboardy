import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import TaskCard from './TaskCard'

const StyledStudentView = styled(Card)`
  width: 100%;
  .student-tasks {
    .student-tasks-container {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    
      > div {
        width: calc(33% - 40px);
      }
    }
  }
`

const StudentView = ({ student }: { student: any }) => {
  return (
    <StyledStudentView>
      <h2>{student.firstName} {student.lastName}</h2>
      <p><b>Email:</b> {student.email}</p>
      <p><b>Date of Birth:</b> {student.dob}</p>
      <p><b>Nationality:</b> {student.nationality}</p>
      <p><b>Gender:</b> {student.gender}</p>
      <p><b>Tags:</b> {student.tags.join(', ')}</p>
      {student.tasks && 
        <div className="student-tasks">
          <p><b>Assigned Tasks: </b></p>
          <div className='student-tasks-container'>
            {/* {student.tasks.map((task: any) => (
              <TaskCard key={student.id + task.title} task={task} min />
            ))} */}
          </div>
        </div>
      }
    </StyledStudentView>
  )
}

export default StudentView