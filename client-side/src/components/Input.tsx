import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  border: solid 1px var(--text-secondary);
  border-radius: 10px;
  padding: 16px 20px;
  outline: none;
  width: 100%;

  &::placeholder {
    color: var(--text-secondary);
  }
`

const Input: any = React.forwardRef<HTMLInputElement, any>(
    (props, ref) => {
    return (
      <StyledInput {...props} ref={ref}/>
    )
  }
);
export default Input