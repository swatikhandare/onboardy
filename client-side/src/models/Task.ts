import Tag from "./Tag"

interface Task {
  id: string
  title: string
  description: string
  tags: Tag[]
  dueDate: string
  isUrgent: boolean
  isNew?: boolean
}

export default Task
