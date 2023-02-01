import React from 'react'
import styled from 'styled-components'
import SearchIcon from '../assets/search.icon'

const StyledSearchBar = styled.div`
  position: relative;
  flex: 1;

  input {
    width: 100%;
    background: white;
    font-size: 16px;
    padding: 16px 80px 16px 32px;
    border: none;
    border-radius: 10px;
    outline: none;
    transition: .2s ease;
    border: 1px solid #eee;

    &::placeholder {
      color: var(--text-secondary)
    }

    &:focus {
      border-color: var(--text-secondary);
    }
  }

  svg {
    position: absolute;
    top: 50%;
    right: 32px;
    transform: translateY(-50%);
  }
`

interface SearchBarProps {
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string 
}


const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeholder = "Search", onChange, className }, ref) => {
    return (
      <StyledSearchBar className={className} ref={ref}>
        <input placeholder={placeholder} onChange={onChange} />
        <SearchIcon />
      </StyledSearchBar>
    );
  }
);

export default SearchBar