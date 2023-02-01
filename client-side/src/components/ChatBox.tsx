import React, { useState } from 'react'
import styled from 'styled-components'
import AttachIcon from '../assets/attach.icon'
import { getReadableDate } from '../helpers'
import Button from './Button'
import Typography from './Typography'

const StyledChatBox = styled.div`
  background: #F0F0F0;
  border-radius: 10px;
  overflow: hidden;
  gap: 10px;

  .messages-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 15px;

    &:empty {
      padding: 0;
    }

    .message {
      position: relative;
      background: white;
      padding: 15px;
      border-radius: 10px;
      display: inline-flex;
      align-items: flex-start;
      gap: 15px;
      max-width: calc(100% - 80px);
      box-shadow: 0px 1px 3px rgba(84, 111, 255, 0.1);

      img {
        border-radius: 50%;
        height: 40px;
        width: 40px;
      }

      .message-date {
        position: absolute;
        left: calc(100% + 15px);
        top: 50%;
        white-space: nowrap;
        transform: translateY(-50%);
        color: var(--text-secondary);
        transition: opacity .4s ease;
        opacity: 0;
        user-select: none;
      }

      &.own {
        background: var(--primary-color);
        color: white;
        align-self: flex-end;

        .message-date {
          right: calc(100% + 15px);
          left: auto;
        }
      }

      &:hover {
        .message-date {
          opacity: 1;
        }
      }
    }
  }

  .controls {
    border: solid 1px var(--text-secondary);
    border-radius: 10px;
    background: white;
    
    .chat-bar {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      gap: 10px;
      
      textarea {
        flex: 1;
        padding: 15px 0;
        border: none;
        outline: none;
        font-size: 14px;
        font-family: inherit;
        resize: none;
  
        &::placeholder {
          color: var(--text-secondary);
          font-family: inherit;
        }
      }

      .attach-icon {
        font-size: 24px;
      }

    }

    .attachments {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 0 20px 20px;

      &:empty {
        display: none;
      }
      
      .attachment {
        position: relative;
        min-height: 60px;
        max-width: 250px;
        min-width: 60px;
        border: solid 1px var(--text-secondary);
        border-radius: 10px;
        padding: 20px;
        display: flex;
        justify-content: flex-start;
        align-self: center;
        
        p {
          line-height: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &:hover {
          &:after {
            content: "x";
            height: 20px;
            width: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            position: absolute;
            right: -10px;
            top: -10px;
            color: white;
            display: flex;
            justify-content: center;
            align-self: center;
            line-height: 1.2;
            cursor: pointer;
            font-size: 14px;
          }
        }
      }
    }
  }
`

const defMessages = [
  {
    author: "John Smith",
    image: "https://via.placeholder.com/50/cccccc/000000?text=JS",
    text: "Hello I have few question regarding this task?",
    createdAt: '2023-01-23T09:34:11.007Z'
  }, 
  {
    author: "Bob Marly",
    image: "https://via.placeholder.com/50/cccccc/000000?text=BM",
    text: "Hello there, how can I help you?",
    createdAt: '2023-01-23T10:24:15.007Z'
  },
]

const ChatBox = () => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(defMessages)
  const isOwnMessage = (message: string) => message === "John Smith"

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setMessages([...messages, {
      author: "John Smith",
      image: "https://via.placeholder.com/50/cccccc/000000?text=JS",
      text: newMessage,
      createdAt: new Date().toJSON()
    }])

    setNewMessage('')
  }
  return (
    <StyledChatBox>
      <div className='messages-container'>
        {messages.map((message) => (
          <div className={`message ${isOwnMessage(message.author) ? 'own' : ''}`}>
            {!isOwnMessage(message.author) && <img src={message.image} />}
            <div className='message-content'>
              {!isOwnMessage(message.author) && <Typography size={14} weight="700" className='message-author'>{message.author}</Typography>}
              <Typography size={14} className='message-text'>{message.text}</Typography>
            </div>
            <Typography size={12} className="message-date">{getReadableDate(message.createdAt)}</Typography>
          </div>
        ))}
      </div>
      <form className='controls' onSubmit={handleSend}>
        <div className='chat-bar'>
          <textarea placeholder='Write your message here…' value={newMessage} onChange={({target}) => setNewMessage(target.value)} />
          <Button className='attach-icon' minimal color="var(--text-secondary)" type="button"><AttachIcon /></Button>
          <Button type="submit" disabled={!newMessage} >Send</Button>
        </div>
        <div className="attachments">
          <div className='attachment'><Typography size={14} weight="600">Attachment.txt</Typography></div>
          <div className='attachment'></div>
          <div className='attachment'></div>
        </div>
      </form>
    </StyledChatBox>
  )
}

export default ChatBox