import React from 'react'
import Card from './Card'
import Typography from './Typography'

const TaskCard = ({ task, min, onClick }: { task: any, min?: boolean, onClick: () => void }) => {
  return (
    <Card className="task" onClick={onClick} style={{ cursor: "pointer"}}>
      <Typography size={16} weight="600" styles={{ marginBottom: "14px"}}>{task.title}</Typography>
      {!min && <p style={{ color: "var(--text-secondary)",whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.description}</p>}
      {/* {Boolean(task.tags.length) && <p><b>Tags:</b> {task.tags.join(', ')}</p>} */}
    </Card>
  )
}

export default TaskCard