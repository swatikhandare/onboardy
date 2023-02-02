import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '../components/ProgressBar';
import TaskCard from '../components/TaskCard';
import TaskPopup from '../components/TaskPopup';
import Typography from '../components/Typography';
import { calculateAssignedTasksProgress, findAndReplaceInArrayByID } from '../helpers';
import AssignedTask from '../models/AssignedTask';
import { useStudentsStore, useUserStore } from '../stores';

const StyledAssignedTasks = styled.div`

  .task-progress {
    margin-bottom: 32px
  }
  
`

const AssignedTasks: React.FunctionComponent = () => {
  const [selectedTask, setSelectedTask] = useState<AssignedTask | null>(null);
  const user = useUserStore((state) => state.user);
  const editStudent = useStudentsStore((state) => state.editStudent);

  const selectedStudent = user?.student;
  if (!selectedStudent || !selectedStudent.assignedTasks) return <></>


  const handleAssignedTaskUpdate = (update: any) => {
    if (!selectedTask || !selectedStudent) return;
    const updatedAssignedTask = {...selectedTask, ...update };
    const updatedAssignedTasks = findAndReplaceInArrayByID(selectedStudent.assignedTasks || [], selectedTask.id, updatedAssignedTask)
    const updatedStudent = {...selectedStudent, assignedTasks: updatedAssignedTasks}
    console.log(selectedStudent, update, updatedStudent)
    setSelectedTask(updatedAssignedTask);
    editStudent(updatedStudent);
  }

  const unDoneTasks = selectedStudent?.assignedTasks?.filter(aTask => !aTask.isDone) || [];
  const doneTasks = selectedStudent?.assignedTasks?.filter(aTask => aTask.isDone) || [];

  return (
    <StyledAssignedTasks className='tasks'>
      <ProgressBar label="Tasks Completion Progress" value={calculateAssignedTasksProgress(selectedStudent?.assignedTasks || [])} />
      <div style={{ display: "flex", gap: "24px"}}>
        <div style={{ marginBottom: "32px", width: "calc(50% - 12px)"}}>
          <Typography size={18} weight="600" styles={{ marginBottom: "16px"}}>Due tasks: {unDoneTasks.length}</Typography>
          <div style={{ display: "flex", gap: "32px", flexDirection: "column"}}>
            {unDoneTasks.map((aTask) => (
              <TaskCard assignedTask={aTask} key={aTask.id} onClick={() => setSelectedTask(aTask)} />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "32px", width: "calc(50% - 12px)"}}>
          <Typography size={18} weight="600" styles={{ marginBottom: "16px"}}>Done tasks: {doneTasks.length}</Typography>
          <div style={{ display: "flex", gap: "24px", flexDirection: "column"}}>
          {doneTasks.map((aTask) => (
              <TaskCard assignedTask={aTask} key={aTask.id} onClick={() => setSelectedTask(aTask)} />
            ))}
          </div>
        </div>
      </div>
      {selectedTask && <TaskPopup assignedTask={selectedTask} onClose={() => setSelectedTask(null)} onAssignedTaskChange={handleAssignedTaskUpdate} />}
    </StyledAssignedTasks>
  )
}

export default AssignedTasks