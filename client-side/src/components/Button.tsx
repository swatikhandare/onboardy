import React from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button<{color: string, minimal: boolean}>`
  display: inline-flex;
  border: none;
  outline: none !important;
  user-select: none;
  cursor: pointer;
  padding: 10px;
  ${({minimal, color}) => minimal 
    ? css`
      background: transparent;
      color: ${color ? color : "var(--primary-color)"};
    ` 
    : css`
      background: ${color ? color : "var(--primary-color)"};
      color: white;
    `}
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:disabled {
    opacity: .5;
  }
`
interface ButtonProps extends React.ButtonHTMLAttributes<ButtonProps> {
  color?: string, 
  minimal?: boolean
}

const Button: React.FunctionComponent<ButtonProps> = ({children, color, minimal, ...props}: any) => {
  return (
    <StyledButton color={color} minimal={minimal} {...props}>{children}</StyledButton>
  )
}

export default Button