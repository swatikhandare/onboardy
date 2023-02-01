import React, { useState } from 'react'
import styled from 'styled-components'
import CaretIcon from '../assets/caret.icon'
import Button from './Button'

const StyledDropdown = styled.div`
  display: inline-block;
  min-width: 180px;
  position: relative;
  font-size: 14px;

  .dropdown-heading {
    background: white;
    border: solid 1px var(--text-secondary);
    border-radius: 10px;
    padding: 12px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .dropdown-caret {
      transition: transform .4s ease;
      color: var(--text-secondary);
    }
  }

  &.is-down {
    .dropdown-caret {
      transform: rotate(-180deg);
    }
  }
   
  .dropdown-body {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    background: white;
    margin: 0;
    list-style: none;
    border: 1px solid var(--text-secondary);
    border-radius: 0 0 10px 10px;
    z-index: 3;
    overflow: hidden;

    li {
      padding: 12px 16px;
      cursor: pointer;
      &:hover {
        background: #efefef;
      }

      &.active {
        background: #ddd;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid var(--text-secondary);
      }
    }
  }

  .dropdown-blocker {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;

  }
  
`
interface Option {
  label: string,
  value: string
}

interface DropdownProps {
  label?: string,
  options?: Option[]
  onChange?: (value: string) => void
  defaultSelected?: string
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({label, options = [], onChange = () => {}, defaultSelected}) => {
  const [selected, setSelected] = useState(options.find(option => option.label === defaultSelected) || { label: "Select" });
  const [isDown, setIsDown] = useState(false);

  const handleChange = (option: Option) => {
    setIsDown(false);
    onChange(option.value);
    setSelected(option);
  }

  return (
    <StyledDropdown className={isDown ? 'is-down' : ''}>
      <div className='dropdown-heading' onClick={() => setIsDown(!isDown)}>
        {selected.label}
        <CaretIcon className='dropdown-caret' />
      </div>
      {isDown && <>
        <ul className='dropdown-body'>
          {options.map((option) => (
            <li className={option.label === selected.label ? 'active' : ''} key={option.value} onClick={() => handleChange(option)}>{option.label}</li>
          ))}
        </ul>
        <div className="dropdown-blocker" onClick={() => setIsDown(false)}/>
      </>
      }
    </StyledDropdown>
  )
}

export default Dropdown
