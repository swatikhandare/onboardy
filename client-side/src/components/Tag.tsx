import React from 'react'
import styled from 'styled-components'
import CrossIcon from '../assets/cross.icon'

const StyledTag = styled.div`
  display: inline-flex;
  border-radius: 25px;
  background: var(--text-secondary);
  padding: 12px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  gap: 10px;
  align-items: center;
  line-height: 1;

  .remove-btn {
    height: 14px;
    cursor: pointer;
  }
`
interface TagProps {
  label: string,
  removable?: boolean,
  onRemove?: () => void
}

const Tag: React.FunctionComponent<TagProps> = ({ label, removable, onRemove }) => {
  return (
    <StyledTag>{label} {removable && <span className='remove-btn' onClick={onRemove}><CrossIcon /></span>}</StyledTag>
  )
}

export default Tag