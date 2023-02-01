import Message from "./Message"
import Task from "./Task"

interface AssignedTask {
  id: string
  refId: string
  task: Task
  studentId: string
  messages: Message[]
  isDone: boolean
}

export default AssignedTask
