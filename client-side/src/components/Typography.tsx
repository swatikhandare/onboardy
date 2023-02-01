import React from 'react'
import styled from 'styled-components'

interface TypographyProps {
  children: React.ReactNode
  className?: string
  styles?: React.CSSProperties
  as?: 'p' | 'h1' | 'h2' | 'h3'
  size?: number
  color?: string
  weight?: string
}


const StyledTypography = styled.div<{size?: number, color?: string, weight?: string}>`
  font-size: ${({size}) => size ? `${size}px` : '1em'};
  color: ${({color}) => color ? `${color}` : 'inherit'};
  font-weight: ${({weight}) => weight ? `${weight}` : 'inherit'};
  /* line-height: 1em; */
`

const Typography: React.FunctionComponent<TypographyProps> = ({ as = 'p', size, color, weight, styles, className='', children}) => {
  return (
    <StyledTypography style={styles} className={`ma-0 ${className}`} as={as} size={size} color={color} weight={weight}>{children}</StyledTypography>
  )
}

export default Typography
