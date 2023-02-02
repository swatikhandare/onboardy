import Blog from "../models/Blog"
import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";

const fetchBlogs = async (): Promise<any> => {
  const blogsRes = await fetch('http://localhost:4000/api/blogs') as any;
  return await blogsRes.json();
  // return getResourceFromLocalStorage<Blog[]>("blogs")
}

const createBlog = async (blog: Blog)  => {
  await fetch('http://localhost:4000/api/blogs', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  })
  // const blogs = getResourceFromLocalStorage<Blog[]>("blogs");
  // setResourceAtLocalStorage<Blog[]>("blogs", [blog, ...blogs])
}

const deleteBlog = async (_id: string) => {
  await fetch(`http://localhost:4000/api/blogs/${_id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  // const blogs = getResourceFromLocalStorage<Blog[]>("blogs") as Blog[];
  // setResourceAtLocalStorage<Blog[]>("blogs", [...blogs.filter((blog) => blog.id !== id)])
}

const updateBlog = async (updatedBlog: Blog) => {
  await fetch(`http://localhost:4000/api/blogs/${updatedBlog._id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBlog),
  })
  // const blogs = getResourceFromLocalStorage<Blog[]>("blogs");
  // const targetIndex = blogs.findIndex(blog => blog.id === updatedBlog.id);
  // const updatedBlogs = blogs.slice()
  // updatedBlogs[targetIndex] = updatedBlog;
  // setResourceAtLocalStorage<Blog[]>("blogs", updatedBlogs)
}

export { fetchBlogs, createBlog, deleteBlog, updateBlog }
