import AssignedTask from "./AssignedTask"
import Tag from "./Tag"

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  dob: string
  gender: string
  nationality: string
  image?: string
  tags: Tag[]
  assignedTasks?: AssignedTask[]
  tasksCompletion?: number
}

export default Student
