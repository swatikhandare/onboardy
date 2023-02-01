import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Tag from '../models/Tag'
import { useTagsStore } from '../stores'
import Input from './Input'

const StyledSearchTags = styled.div`
  position: relative;
`

const StyledResults = styled.ul`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  background: white;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--text-secondary);
  border-radius: 0 0 10px 10px;
  z-index: 3;
  overflow: hidden;
  font-size: 14px;


  li {
    padding: 12px 16px;
      cursor: pointer;
      &:hover {
        background: #efefef;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid var(--text-secondary);
      }
  }
`

interface SearchTagsProps {
  onSelect: (tag: Tag) => void
  excludedTags?: Tag[]
}

const SearchTags: React.FunctionComponent<SearchTagsProps> = ({ onSelect = () => {}, excludedTags = [] }) => {
  const tags = useTagsStore((state) => state.tags);
  const getTags = useTagsStore((state) => state.getTags);
  const searchBarRef = useRef<any>(null);

  useEffect(() => {
    getTags();
  },[])

  const [results, setResults] = useState<Tag[]>([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResults(tags.filter((tag) => tag.label.includes(e.target.value) && !excludedTags.some((t) => t.label === tag.label)));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!results.length) return;
    handleSelection(results[0]);
  }

  const handleSelection = (tag: Tag) => {
    onSelect(tag);
    setResults([]);
    searchBarRef.current.value = "";
    searchBarRef.current.focus();
  }

  return (
    <StyledSearchTags>
      <form onSubmit={handleSubmit}>
        <Input ref={searchBarRef} placeholder='Search for tags' onChange={handleSearch} style={{ marginBottom: "16px" }} />
      </form>
      {!!results.length && <StyledResults>
        {results.map((tag) => <li onClick={() => handleSelection(tag)} key={tag.id}>{tag.label}</li>)}
      </StyledResults>}
    </StyledSearchTags>
  )
}

export default SearchTags