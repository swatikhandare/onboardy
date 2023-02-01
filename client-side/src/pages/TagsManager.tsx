import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import EditIcon from '../assets/edit.icon'
import TrashIcon from '../assets/trash.icon'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import PopupMenu from '../components/PopupMenu'
import SearchBar from '../components/SearchBar'
import Tag from '../components/Tag'
import Typography from '../components/Typography'
import ITag from '../models/Tag'
import { useTagsStore } from '../stores'

const StyledTagsManager = styled.div`

  .tags-search-bar {
    margin-bottom: 24px;
  }

  .tags-manager-wrapper {
    max-width: 768px;
    width: 100%;
    margin: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }


  th {
    text-align: left;
    font-weight: 600;
    padding: 10px 20px;
    border-bottom: 1px solid var(--text-secondary);
    white-space: nowrap;
  }
  

  tbody {
    tr:hover {
      background: #f5f5f5;
    }

    &:before {
      content: "-";
      display: block;
      line-height: 15px;
      color: transparent;
    }

    td {
      padding: 12px 20px;

      &:nth-of-type(1) {
        width: 100px;
      }

      &:nth-of-type(2) {
        width: 100%;
      }

      &:nth-of-type(3) {
        display: flex;
        gap: 10px;
        white-space: nowrap;
      }
    }
  }

  .create-button {
    margin-bottom: 24px;
    width: 100%;
    padding: 16px;
  }

`

const TagsManager = () => {
  const tags = useTagsStore((state) => state.tags);
  const getTags = useTagsStore((state) => state.getTags);
  const addTag = useTagsStore((state) => state.addTag);
  const editTag = useTagsStore((state) => state.editTag);
  const removeTag = useTagsStore((state) => state.removeTag);
  
  useEffect(() => {
    getTags()
  }, [])

  const [isCreating, setIsCreating] = useState(false)
  const [editing, setEditing] = useState<ITag | null>(null)
  const [searchQuery, setSearchQuery] = useState('');

  const handleTaskCreate = async (newTag: ITag) => {
    await addTag(newTag);
  }

  const handleTaskRemove = async (targetTag: ITag) => 
  {
    const isConfirmed = confirm(`Are you sure you want to delete the following tag? \n\n"${targetTag.label}"`)
    if (!isConfirmed) return
    await removeTag(targetTag.id);
  }
  
  const handleTagEdit = async (editedTag: ITag) => {
    await editTag(editedTag);
  }

  return (
    <StyledTagsManager>
      <Card>
        <div className="tags-manager-wrapper">
          {!!tags.length ? 
          <>
            <SearchBar className='tags-search-bar' placeholder='Search tags' onChange={({target}) => setSearchQuery(target.value)} />
            <Button onClick={() => setIsCreating(true)} className="create-button">Create new tag</Button>
            <table>
              <thead>
                <tr>
                  <th>Tag label</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tags.filter((tag) => tag.label.toLowerCase().includes(searchQuery)).map(((tag) => (
                  <tr key={tag.id}>
                    <td><Tag label={tag.label} /></td>
                    <td><span>{tag.description}</span></td>
                    <td>
                      <div>
                        <Button minimal onClick={() => setEditing(tag)}><EditIcon /></Button> 
                        <Button minimal onClick={() => handleTaskRemove(tag)}><TrashIcon /></Button>
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </>
          : <Typography styles={{ textAlign: "center"}}>There are no created tags!</Typography>}
          {isCreating && <EditTagPopup onComplete={handleTaskCreate} onClose={() => setIsCreating(false)}/>}
          {editing && <EditTagPopup tag={editing} onComplete={handleTagEdit} onClose={() => setEditing(null)}/>}
        </div>
      </Card>
    </StyledTagsManager>
  )
}

const EditTagPopup = ({onComplete, onClose, tag}: any) => {

  const labelRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

  const handleComplete = () => {
    if (!labelRef.current.value) return;
    onComplete({
      id: tag?.id || crypto.randomUUID(),
      label: labelRef.current.value,
      description: descriptionRef.current.value
    });
    onClose();
  }

  return(
    <PopupMenu onClose={onClose}>
      <Typography size={24} weight="600"  styles={{ marginBottom: "24px" }}>{tag ? "Editing" : "Creating new"} tag</Typography>

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Label</Typography>
      <Input ref={labelRef} defaultValue={tag?.label} style={{ marginBottom: "16px" }} />

      <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>Description</Typography>
      <Input ref={descriptionRef} defaultValue={tag?.description} style={{ marginBottom: "16px" }}/>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
        <Button onClick={handleComplete}>{tag ? "Apply Changes" : "Create"}</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </PopupMenu>
  )
}

export default TagsManager