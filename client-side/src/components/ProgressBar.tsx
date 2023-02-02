import React from 'react'
import styled from 'styled-components'
import Typography from './Typography'

const StyledProgressBar = styled.div<{percent: number}>`
  margin-bottom: 32px;

  .progress-label {
    display: flex; 
    justify-content: space-between;
  }

  .progress-rail {
    position: relative;
    margin: 10px 0;
    height: 8px;
    border-radius: 8px;
    background: #BAC8FF; 
  
    &:before {
      content: "";
      height: 100%;
      width: ${({ percent }) =>  percent}%;
      background: var(--primary-color);
      position: absolute;
      border-radius: 8px;
      left: 0;
      top: 0;
      transition: .2s ease;
    }
  
    /* &:after {
      content: "";
      height: 16px;
      width: 16px;
      background: var(--primary-color);
      border: 2px solid white;
      position: absolute;
      border-radius: 50%;
      left: calc(${({ percent }) =>  percent}% - 9px);
      top: 50%;
      transform: translateY(-50%);
    } */
  }
`

interface ProgressBarProps {
  value: number,
  label?: string,
  className?: string,
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({label, value, className}) => {
  const progress = value > 100 ? 100 : value
  return (
    <StyledProgressBar percent={progress} className={className}>
      {label && <Typography size={14} weight="600" className='progress-label'>
        <span>{label}</span> <span style={{color: "var(--primary-color)"}}>{progress}%</span>
      </Typography>}
      <div className='progress-rail' />
    </StyledProgressBar>
  )
}

export default ProgressBar