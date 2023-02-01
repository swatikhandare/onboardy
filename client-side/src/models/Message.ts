import Attachment from "./Attachement"
import Staff from "./Staff"
import Student from "./Student"

interface Message {
  id: string
  author: Student | Staff
  text: string
  attachments: Attachment[]
  createdAt: string
}

export default Message
