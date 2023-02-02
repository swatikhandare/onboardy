import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Button from '../components/Button';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import TaskPopup from '../components/TaskPopup';
import Typography from '../components/Typography';
import LatestMessage from '../models/LatestMessage';
import { useLatestMessagesStore } from '../stores'

const StyledLatestMessages = styled.div`
  display: flex;
  gap: 32px;
  height: calc(100vh - 125px);
  overflow: overlay;

  .latest-messages-list {
    width: 400px;
    flex-shrink: 0;
    overflow: auto;

    .latest-messages-search-bar {
      margin-bottom: 24px;

      input {
        border: 1px solid #eee;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 20px;
        border-bottom: 1px solid #eee;
        transition: 0.2s ease;

        &:hover {
          background: #f5f5f7;
          cursor: pointer;
        }

        &.active {
          background: #f0f0f0;
        }
      }
    }
  }

  .blog-preview-container {
    flex-grow: 1;
    overflow: auto;

    .blog-content:empty:after {
      content: "Write blog content here";
      color: var(--text-secondary);
    }
  }
`;

const LatestMessages: React.FunctionComponent = () => {
  const latestMessages = useLatestMessagesStore((state) => state.latestMessages);
  const getLatestMessages = useLatestMessagesStore((state) => state.getLatestMessages);

  const [selectedMessage, setSelectedMessage] = useState<LatestMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getLatestMessages();
  }, [])
  

  const assignedTask = selectedMessage?.student
  
  return (
    <StyledLatestMessages>
      <Card className="latest-messages-list">
        <SearchBar
          className="latest-messages-search-bar"
          placeholder="Search latest messages"
          onChange={({ target }) => setSearchQuery(target.value)}
        />
        <ul>
          {latestMessages
            // .filter((message) => message.title.toLowerCase().includes(searchQuery))
            .map((message) => (
              <li
                key={message.id}
                className={message.id === selectedMessage?.id ? "active" : ""}
                onClick={() => setSelectedMessage(message)}
              >
                <Typography size={16} weight="600">{message.assignedTask.task.title}</Typography>
                <Typography size={16}>
                  <span style={{ fontWeight: "600"}}>{message.student.firstName} {message.student.lastName}:</span> {message.message.text}
                  
                </Typography>
              </li>
            ))}
        </ul>
      </Card>
      <Card className="message-preview-container">
        {selectedMessage && <TaskPopup assignedTask={selectedMessage.assignedTask}  onAssignedTaskChange={() => {}} staticMode />}
        {/* <BlogsPreview selectedBlog={selectedBlog} onSave={handleSave} onRemove={handleRemove} /> */}
      </Card>
    </StyledLatestMessages>

    // <ul>{
    //   latestMessages.map((latestMessage) => (
    //     <li>{latestMessage.message.text}</li>
    //   ))  
    // }</ul>
  )
}

export default LatestMessages