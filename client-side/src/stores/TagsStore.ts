import { create } from 'zustand'
import { createTag, deleteTag, fetchTags, updateTag } from '../APIs/tagsApi'
import Tag from '../models/Tag'

interface TagState {
  tags: Tag[]
  getTags: () => void
  addTag: (tag: Tag) => void
  editTag: (updatedTag: Tag) => void
  removeTag: (id: string) => void
}

const useTagsStore = create<TagState>((set, get) => ({
  tags: [],
  getTags: async () => {
    const tags = await fetchTags();
    set({ tags })
  },
  addTag: async (tag) => {
    await createTag(tag);
    get().getTags();
  },
  editTag: async (updatedTag) => {
    await updateTag(updatedTag);
    get().getTags();
  },
  removeTag: async (id) => {
    await deleteTag(id);
    get().getTags();
  },
}))

export default useTagsStore