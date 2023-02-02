import AssignedTask from "./AssignedTask"
import Staff from "./Staff"
import Student from "./Student"
import Tag from "./Tag"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  dob?: string
  gender?: string
  nationality?: string
  image?: string
  tags?: Tag[]
  assignedTasks?: AssignedTask[]
  tasksCompletion?: number
  isAdmin?: boolean
  student?: Student
  staff?: Staff
  type: string
}

export default User;
