import React from "react";
import AssignedTask from "../models/AssignedTask";
import Button from "./Button";
import ChatBox from "./ChatBox";
import PopupMenu from "./PopupMenu";
import Typography from "./Typography";

const TaskPopup: React.FunctionComponent<{
  assignedTask: AssignedTask;
  onClose?: () => void;
  onTaskStatusChange: (isDone: boolean) => void;
}> = ({ assignedTask, onClose, onTaskStatusChange }) => {
  return (
    <PopupMenu onClose={onClose}>
      <div style={{ float: "right" }}>
        {assignedTask.isDone ? (
          <Button
            color="var(--danger-color)"
            minimal
            onClick={() => onTaskStatusChange(false)}
          >
            Mark as undone
          </Button>
        ) : (
          <Button minimal onClick={() => onTaskStatusChange(true)}>
            Mark as done
          </Button>
        )}
      </div>
      <Typography size={24} weight="600" styles={{ marginBottom: "24px" }}>
        {assignedTask.task.title}
      </Typography>
      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>
        Description
      </Typography>
      <Typography styles={{ marginBottom: "16px" }}>
        {assignedTask.task.description}
      </Typography>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>
        Discussion
      </Typography>
      <ChatBox />
    </PopupMenu>
  );
};

export default TaskPopup;
