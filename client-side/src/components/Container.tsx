import React from 'react'
import styled from 'styled-components'
import Typography from './Typography'

const StyledContainer = styled.div`
  padding: 32px;
  overflow: overlay;
  
  .title {
    margin-bottom: 32px;
  }
`

interface ContainerProps {
  children?: React.ReactNode
  title?: string
}

const Container: React.FunctionComponent<ContainerProps> = ({ title, children}) => {
  return (
    <StyledContainer>
      {title && <Typography className='title' size={24} weight={"600"}>{title}</Typography>}
      {children}
    </StyledContainer>
  )
}

export default Container