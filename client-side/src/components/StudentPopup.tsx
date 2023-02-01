import React, { useState } from 'react'
import AssignedTask from '../models/AssignedTask'
import Student from '../models/Student'
import ITag from '../models/Tag'
import Button from './Button'
import Input from './Input'
import PopupMenu from './PopupMenu'
import SearchTags from './SearchTags'
import Tag from './Tag'
import TaskCard from './TaskCard'
import TaskPopup from './TaskPopup'
import Typography from './Typography'

interface StudentPopup {
  student: Student
  onClose: () => void
  onStudentDelete: (id: string) => void
}

const StudentPopup: React.FunctionComponent<StudentPopup> = ({ student, onStudentDelete, onClose }) => {
  const [isEditing, setEditing] = useState(false);
  const [studentDetails, setStudentDetails] = useState(student)
  const [selectedAssignedTask, setSelectedAssignedTask] = useState<AssignedTask | null>(null)

  const handleTagsAdd = (tag: ITag) => {
    if (studentDetails.tags.includes(tag)) return
    setStudentDetails({ ...studentDetails, tags: [...studentDetails.tags, tag]});
  }

  const handleTagRemove = (tag: ITag) => {
    setStudentDetails({ ...studentDetails, tags: [...studentDetails.tags.filter((t) => t.id !== tag.id)]});
  }

  const handleStudentDelete = () => {
    const isConfirmed = confirm(`Are you sure you want to delete the following Student:\n\n"${student.firstName} ${student.lastName}"`);
    if (!isConfirmed) return;
    onStudentDelete(studentDetails.id);
    onClose();
  }

  return (
    <PopupMenu onClose={onClose}>
      <Typography size={24} weight="600" styles={{ marginBottom: "24px" }}>{studentDetails.firstName} {studentDetails.lastName}</Typography>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Date of Birth</Typography>
      {isEditing ? <Input placeholder='Date of birth' value={studentDetails.dob} style={{ marginBottom: "16px" }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentDetails({ ...studentDetails, dob: e.target.value})}/>
      : <Typography size={14} styles={{ marginBottom: "16px" }}>{studentDetails.dob}</Typography>}

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Gender</Typography>
      {isEditing ? <Input placeholder='Gender' value={studentDetails.gender} style={{ marginBottom: "16px" }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentDetails({ ...studentDetails, gender: e.target.value})}/>
      : <Typography size={14} styles={{ marginBottom: "16px" }}>{studentDetails.gender}</Typography>}

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Nationality</Typography>
      {isEditing ? <Input placeholder='Nationality' value={studentDetails.nationality} style={{ marginBottom: "16px" }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentDetails({ ...studentDetails, nationality: e.target.value})}/>
      : <Typography size={14} styles={{ marginBottom: "16px" }}>{studentDetails.nationality}</Typography>}

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Email</Typography>
      {isEditing ? <Input placeholder='Email' value={studentDetails.email} style={{ marginBottom: "16px" }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentDetails({ ...studentDetails, email: e.target.value})}/>
      : <Typography size={14} styles={{ marginBottom: "16px" }}>{studentDetails.email}</Typography>}

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Student Tags</Typography>
      {isEditing && <SearchTags excludedTags={studentDetails.tags} onSelect={handleTagsAdd}/>}
      <div style={{ display: "flex", gap: "10px", background: "#f0f0f0", padding: "15px", borderRadius: "10px", flexWrap: "wrap", minHeight: "68px", marginBottom: "16px" }}>
        {studentDetails.tags.map((tag) => (
          <Tag key={tag.id} label={tag.label} removable={isEditing} onRemove={() => handleTagRemove(tag)} />
        ))}
      </div>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Assigned Tasks</Typography>
      <div style={{ background: "#f5f5f5", display: "flex", padding: "24px", borderRadius: "10px", gap: "24px", flexWrap: "wrap" }}>
        {student.assignedTasks?.map(aTask => (
          <TaskCard task={aTask.task} onClick={() => setSelectedAssignedTask(aTask)} />
        ))}
      </div>

      <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleStudentDelete} color="var(--danger-color)">Delete</Button>
        <div style={{ display: "flex", gap: "10px"}}>
          <Button onClick={() => setEditing(!isEditing)}>{isEditing ? "Save" : "Edit"}</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>

      {selectedAssignedTask && <TaskPopup assignedTask={selectedAssignedTask} onTaskStatusChange={() => {}}/>}
    </PopupMenu>
  )
}



export default StudentPopup