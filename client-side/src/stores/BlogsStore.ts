import { create } from 'zustand'
import { createBlog, deleteBlog, fetchBlogs, updateBlog } from '../APIs/blogsApi'
import Blog from '../models/Blog'

interface BlogState {
  blogs: Blog[]
  getBlogs: () => void
  addBlog: (blog: Blog) => void
  editBlog: (updatedBlog: Blog) => void
  removeBlog: (id: string) => void
}

const useBlogsStore = create<BlogState>((set, get) => ({
  blogs: [],
  getBlogs: async () => {
    const blogs = await fetchBlogs();
    set({ blogs });
  },
  addBlog: async (blog) => {
    await createBlog(blog);
    get().getBlogs();
  },
  editBlog: async (updatedBlog) => {
    await updateBlog(updatedBlog);
    get().getBlogs();
  },
  removeBlog: async (_id) => {
    await deleteBlog(_id);
    get().getBlogs();
  },
}))

export default useBlogsStore