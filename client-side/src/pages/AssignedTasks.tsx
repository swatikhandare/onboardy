import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '../components/ProgressBar';
import TaskCard from '../components/TaskCard';
import TaskPopup from '../components/TaskPopup';
import Typography from '../components/Typography';
import tasks from "../data/tasks.json";
import AssignedTask from '../models/AssignedTask';
import { useStudentsStore } from '../stores';

const StyledAssignedTasks = styled.div`

  .task-progress {
    margin-bottom: 32px
  }
  
`

const AssignedTasks: React.FunctionComponent = () => {
  const [value, setValue] = useState(50);
  const [selectedTask, setSelectedTask] = useState<AssignedTask | null>(null)

  const students = useStudentsStore((state) => state.students);
  const getStudents = useStudentsStore((state) => state.getStudents);
  const editStudent = useStudentsStore((state) => state.editStudent);

  useEffect(() => {
    getStudents()
  }, [])

  const selectedStudent = students[1];

  const onTaskStatusChange = (isDone: boolean) => {
    if (!selectedTask) return;
    const AssignedTasksClone = [...selectedStudent.assignedTasks || []];
    const targetAssignedTasksIndex = AssignedTasksClone.findIndex(aTask => aTask.id === selectedTask.id)
    const updatedAssignedTask = {...AssignedTasksClone[targetAssignedTasksIndex], isDone}
    AssignedTasksClone[targetAssignedTasksIndex] = updatedAssignedTask
    const updatedStudent = {...selectedStudent, assignedTasks: AssignedTasksClone}
    setSelectedTask(updatedAssignedTask);
    editStudent(updatedStudent);
  }

  const unDoneTasks = selectedStudent?.assignedTasks?.filter(aTask => !aTask.isDone) || [];
  const doneTasks = selectedStudent?.assignedTasks?.filter(aTask => aTask.isDone) || [];

  return (
    <StyledAssignedTasks className='tasks'>
      <ProgressBar label="Tasks Completion Progress" value={((doneTasks.length / (selectedStudent?.assignedTasks || []).length) * 100) || 0} />
      <div style={{ marginBottom: "32px"}}>
        <Typography size={18} weight="600" styles={{ marginBottom: "16px"}}>Active tasks: {unDoneTasks.length}</Typography>
        <div className='container'>
          {unDoneTasks.map((aTask) => (
            <TaskCard key={aTask.id} onClick={() => setSelectedTask(aTask)} task={aTask.task}/>
          ))}
        </div>
      </div>
      <div>
        <Typography size={18} weight="600" styles={{ marginBottom: "16px"}}>Done tasks: {doneTasks.length}</Typography>
        <div className='container'>
        {doneTasks.map((aTask) => (
            <TaskCard key={aTask.id} onClick={() => setSelectedTask(aTask)} task={aTask.task}/>
          ))}
        </div>
      </div>
      {selectedTask && <TaskPopup assignedTask={selectedTask} onClose={() => setSelectedTask(null)} onTaskStatusChange={onTaskStatusChange}/>}
    </StyledAssignedTasks>
  )
}

export default AssignedTasks