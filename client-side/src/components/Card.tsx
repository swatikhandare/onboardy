import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 24px;
  color: black;
`

interface CardProps { 
  className?: string, 
  children?: React.ReactNode, 
  onClick?: () => void
  style?: React.CSSProperties
}

const Card: React.FunctionComponent<CardProps> = ({ children, className, onClick, style }) => {
  return (
    <StyledCard className={`card ${className}`} onClick={onClick} style={style}>{children}</StyledCard>
  )
}

export default Card