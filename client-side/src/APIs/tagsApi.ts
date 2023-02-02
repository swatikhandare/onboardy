import Tag from "../models/Tag"
import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";

const fetchTags = async (): Promise<Tag[]> => {
  const tagsRes = await fetch('http://localhost:4000/api/tags') as any;
  return await tagsRes.json()
  // return getResourceFromLocalStorage<Tag[]>("tags")
}

const createTag = async (tag: Tag)  => {
  await fetch('http://localhost:4000/api/tags', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  })
  // const tags = getResourceFromLocalStorage<Tag[]>("tags");
  // setResourceAtLocalStorage<Tag[]>("tags", [tag, ...tags])
}

const deleteTag = async (_id: string) => {
  await fetch(`http://localhost:4000/api/tags/${_id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  // const tags = getResourceFromLocalStorage<Tag[]>("tags") as Tag[];
  // setResourceAtLocalStorage<Tag[]>("tags", [...tags.filter((tag) => tag.id !== id)])
}

const updateTag = async (updatedTag: Tag) => {
  await fetch(`http://localhost:4000/api/tags/${updatedTag._id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTag),
  })
  // const tags = getResourceFromLocalStorage<Tag[]>("tags");
  // const targetIndex = tags.findIndex(tag => tag.id === updatedTag.id);
  // const updatedTags = tags.slice()
  // updatedTags[targetIndex] = updatedTag;
  // setResourceAtLocalStorage<Tag[]>("tags", updatedTags)
}

export { fetchTags, createTag, deleteTag, updateTag }
