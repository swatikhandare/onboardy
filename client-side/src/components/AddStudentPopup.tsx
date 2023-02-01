import React, { useState } from 'react'
import Student from '../models/Student'
import ITag from '../models/Tag'
import Button from './Button'
import Input from './Input'
import PopupMenu from './PopupMenu'
import SearchTags from './SearchTags'
import Tag from './Tag'
import Typography from './Typography'

interface AddStudentPopupProps {
  onClose: () => void 
  onCreate: (newStudent: Student) => void 
}

const AddStudentPopup: React.FunctionComponent<AddStudentPopupProps> = ({ onClose, onCreate }) => {
  const [studentDetails, setStudentDetails] = useState<Student>({ id: crypto.randomUUID(), firstName: '', lastName: '', dob: '', gender: '', nationality: '', email: '', tags: [] })

  const handleTagsAdd = (tag: ITag) => {
    if (studentDetails.tags.includes(tag)) return;
    setStudentDetails({ ...studentDetails, tags: [...studentDetails.tags, tag]});
  }

  const handleTagRemove = (tag: ITag) => {
    setStudentDetails({ ...studentDetails, tags: [...studentDetails.tags.filter((t) => t !== tag)]});
  }

  const handleStudentCreate = () => {
    onCreate(studentDetails);
    onClose();
  }

  return (
    <PopupMenu onClose={onClose}>
      <Typography size={24} weight="600" styles={{ marginBottom: "24px" }}>Adding new student</Typography>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>First name</Typography>
      <Input placeholder='First name' value={studentDetails.firstName} style={{ marginBottom: "16px" }} onChange={({target}: any) => setStudentDetails({ ...studentDetails, firstName: target.value})}/>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Last name</Typography>
      <Input placeholder='Last name' value={studentDetails.lastName} style={{ marginBottom: "16px" }} onChange={({target}: any) => setStudentDetails({ ...studentDetails, lastName: target.value})}/>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Date of Birth</Typography>
      <Input type="date" placeholder='Date of birth' value={studentDetails.dob} style={{ marginBottom: "16px" }} onChange={({target}: any) => setStudentDetails({ ...studentDetails, dob: target.value})}/>
      
      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Gender</Typography>
      <Input placeholder='Gender' value={studentDetails.gender} style={{ marginBottom: "16px" }} onChange={({target}: any) => setStudentDetails({ ...studentDetails, gender: target.value})}/>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Nationality</Typography>
      <Input placeholder='Nationality' value={studentDetails.nationality} style={{ marginBottom: "16px" }} onChange={({target}: any) => setStudentDetails({ ...studentDetails, nationality: target.value})}/>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Email</Typography>
      <Input placeholder='Email' value={studentDetails.email} style={{ marginBottom: "16px" }} onChange={({target}: any) => setStudentDetails({ ...studentDetails, email: target.value})}/>
      
      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Student Tags</Typography>
      <SearchTags excludedTags={studentDetails.tags} onSelect={handleTagsAdd}/>
      <div style={{ display: "flex", gap: "10px", background: "#f0f0f0", padding: "15px", borderRadius: "10px", flexWrap: "wrap",  minHeight: "68px" }}>
        {studentDetails.tags.length ? studentDetails.tags.map((tag) => (
          <Tag key={tag.id} label={tag.label} removable onRemove={() => handleTagRemove(tag)} />
        )) : <>No tags are assigned</>}
      </div>

      <div style={{ marginTop: "15px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button onClick={handleStudentCreate}>Add Student</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </PopupMenu>
  )
}



export default AddStudentPopup