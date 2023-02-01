import Tag from "../models/Tag"
import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";

const fetchTags = async (): Promise<Tag[]> => {
  return getResourceFromLocalStorage<Tag[]>("tags")
}

const createTag = async (tag: Tag)  => {
  const tags = getResourceFromLocalStorage<Tag[]>("tags");
  setResourceAtLocalStorage<Tag[]>("tags", [tag, ...tags])
}

const deleteTag = async (id: string) => {
  const tags = getResourceFromLocalStorage<Tag[]>("tags") as Tag[];
  setResourceAtLocalStorage<Tag[]>("tags", [...tags.filter((tag) => tag.id !== id)])
}

const updateTag = async (updatedTag: Tag) => {
  const tags = getResourceFromLocalStorage<Tag[]>("tags");
  const targetIndex = tags.findIndex(tag => tag.id === updatedTag.id);
  const updatedTags = tags.slice()
  updatedTags[targetIndex] = updatedTag;
  setResourceAtLocalStorage<Tag[]>("tags", updatedTags)
}

export { fetchTags, createTag, deleteTag, updateTag }
