import AssignedTask from "./AssignedTask";
import Message from "./Message";
import Student from "./Student";

interface LatestMessage {
  id: string
  student: Student
  message: Message
  assignedTask: AssignedTask
  isNew: boolean
}

export default LatestMessage;