import Blog from "../models/Blog"
import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";

const fetchBlogs = async (): Promise<Blog[]> => {
  return getResourceFromLocalStorage<Blog[]>("blogs")
}

const createBlog = async (blog: Blog)  => {
  const blogs = getResourceFromLocalStorage<Blog[]>("blogs");
  setResourceAtLocalStorage<Blog[]>("blogs", [blog, ...blogs])
}

const deleteBlog = async (id: string) => {
  const blogs = getResourceFromLocalStorage<Blog[]>("blogs") as Blog[];
  setResourceAtLocalStorage<Blog[]>("blogs", [...blogs.filter((blog) => blog.id !== id)])
}

const updateBlog = async (updatedBlog: Blog) => {
  const blogs = getResourceFromLocalStorage<Blog[]>("blogs");
  const targetIndex = blogs.findIndex(blog => blog.id === updatedBlog.id);
  const updatedBlogs = blogs.slice()
  updatedBlogs[targetIndex] = updatedBlog;
  setResourceAtLocalStorage<Blog[]>("blogs", updatedBlogs)
}

export { fetchBlogs, createBlog, deleteBlog, updateBlog }
