import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Typography from './Typography'
import IntroIcon from './../assets/intro.icon'
import TasksIcon from './../assets/tasks.icon'
import FAQsIcon from './../assets/faqs.icon'
import StudentIcon from './../assets/student.icon'
import TagIcon from '../assets/tag.icon'
import BlogIcon from '../assets/blog.icon'

const StyledNavBar = styled.div`
  background: white;
  height: 100vh;
  width: 290px;
  border-right: 1px solid #F5F5F7;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  
  .nav-links {
    margin: 60px 0;
    padding: 0;
    list-style: none;
    
    li {
      color: var(--text-secondary);
      margin-bottom: 20px;
      padding: 10px 20px;
      cursor: pointer;
      user-select: none;
      border-radius: 10px;
      min-height: 45px;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: .2s ease;

      svg {
        font-size: 24px;
      }

      &.active {
        background: #F5F5F7;
        color: black;
      }
    }
  }

  .profile-details {
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 15px;

    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;

    }
  }
`

const navLinks = [
  { label: "Introduction", path: "introduction", icon: IntroIcon },
  { label: "Assigned Tasks", path: "assigned-tasks", icon: TasksIcon },
  { label: "FAQs", path: "faqs", icon: FAQsIcon },
  { label: "Students", path: "students", icon: StudentIcon },
  { label: "FAQs Manager", path: "faqs-manager", icon: FAQsIcon },
  { label: "Tags Manager", path: "tags-manager", icon: TagIcon },
  { label: "Tasks Manager", path: "tasks", icon: TasksIcon },
  { label: "Blogs", path: "blogs", icon: BlogIcon },

]

const NavigationBar = () => {
  const location = useLocation()

  return (
    <StyledNavBar>
      <div>
        <div className='onboardy-logo'>
          <Typography size={32} weight={"600"}>OnBoardy</Typography>
        </div>
        <ul className='nav-links'>
          {navLinks.map((nav, idx) => (
            <Link key={nav.label} to={nav.path}>
              <li className={location.pathname.includes(nav.path) ? 'active' : ''} key={idx}>
                <><nav.icon /> <Typography size={16} weight="600">{nav.label}</Typography></>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className='profile-details'>
        <img src="https://via.placeholder.com/50/cccccc/000000?text=JS" alt="profile" />
        <Typography size={16} weight="600">John Smith</Typography>
      </div>
    </StyledNavBar>
  )
}

export default NavigationBar