import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import SearchBar from "../components/SearchBar";
import Typography from "../components/Typography";
import RichTextEditor from "./../components/RichTextEditor"
import { useBlogsStore } from "../stores";
import Blog from "../models/Blog";

const StyledBlogs = styled.div`
  display: flex;
  gap: 32px;
  height: calc(100vh - 125px);
  overflow: overlay;

  .blogs-list {
    width: 400px;
    flex-shrink: 0;
    overflow: auto;

    .blogs-search-bar {
      margin-bottom: 24px;

      input {
        border: 1px solid #eee;
      }
    }

    .create-button {
      margin-bottom: 24px;
      width: 100%;
      padding: 16px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 20px;
        border-bottom: 1px solid #eee;
        transition: 0.2s ease;

        &:hover {
          background: #f5f5f7;
          cursor: pointer;
        }

        &.active {
          background: #f0f0f0;
        }
      }
    }
  }

  .blog-preview-container {
    flex-grow: 1;
    overflow: auto;

    .blog-content:empty:after {
      content: "Write blog content here";
      color: var(--text-secondary);
    }
  }
`;

const Blogs: React.FunctionComponent = () => {
  const blogs = useBlogsStore((state) => state.blogs);
  const getBlogs = useBlogsStore((state) => state.getBlogs);
  const addBlog = useBlogsStore((state) => state.addBlog);
  const removeBlog = useBlogsStore((state) => state.removeBlog);
  const editBlog = useBlogsStore((state) => state.editBlog);


  useEffect(() => {
    getBlogs();
  }, [])

  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateNewBlog = () => {
    const newBlog = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      isNew: true
    };
    setSelectedBlog(newBlog);
  };

  const handleSave = (blog: Blog) => {
    if (blog.isNew) {
      const { isNew, ...newBlog } = blog;
      addBlog(newBlog);
    } else {
      editBlog(blog);
    }
  }

  const handleRemove = (blogId: string) => {
    removeBlog(blogId);
    setSelectedBlog(null);
  }

  return (
    <StyledBlogs>
      <Card className="blogs-list">
        <SearchBar
          className="blogs-search-bar"
          placeholder="Search blogs"
          onChange={({ target }) => setSearchQuery(target.value)}
        />
        <Button className="create-button" onClick={handleCreateNewBlog}>
          Create new blog
        </Button>
        <ul>
          {blogs
            .filter((blog) => blog.title.toLowerCase().includes(searchQuery))
            .map((blog) => (
              <li
                key={blog.id}
                className={blog.id === selectedBlog?.id ? "active" : ""}
                onClick={() => setSelectedBlog(blog)}
              >
                <Typography size={16} weight="600">
                  {blog.title || "New blog"}
                </Typography>
              </li>
            ))}
        </ul>
      </Card>
      <Card className="blog-preview-container">
        <BlogsPreview selectedBlog={selectedBlog} onSave={handleSave} onRemove={handleRemove} />
      </Card>
    </StyledBlogs>
  );
};

const BlogsPreview: React.FunctionComponent<{ selectedBlog: Blog | null, onSave: (blog: Blog) => void, onRemove: (blogId: string) => void }> = ({ selectedBlog, onSave, onRemove }) => {
  const [blog, setBlog] = useState<Blog | null>(selectedBlog);
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<any>(null);

  useEffect(() => {
    setIsEditing(false);

    setBlog(selectedBlog);
    if (selectedBlog?.isNew) {
      setIsEditing(true);
    }
  }, [selectedBlog]);

  const handleCancel = () => {
    if (!blog) return
    setIsEditing(false)
    if (blog.isNew) {
      setBlog(null)
    }
  }

  const handleSave = () => {
    if (!blog) return
    onSave({...blog, content: contentRef.current.innerHTML});
    setIsEditing(false);
  }

  const handleBlogRemove = () => {
    if (!blog) return
    const isConfirmed = confirm(`Are you sure you want to remove the following blog: \n\n "${blog.title}"`);
    if(!isConfirmed) return

    onRemove(blog.id);
  }

  return (
    <div className="blog-preview" style={{ position: "relative", height: "100%" }}>
    { blog ?  (
      <>
        <div style={{ display: "flex", justifyContent: "flex-end",gap: "10px" }}>
          {isEditing ? (
            <>
              <Button minimal color="black" onClick={handleCancel}>
                Cancel
              </Button>
              <Button minimal onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button minimal color="#DB2719" onClick={() => handleBlogRemove()}>
                Delete Blog
              </Button>
              <Button minimal onClick={() => setIsEditing(true)}>
                Edit Blog
              </Button>
            </>
          )}
        </div>
        {isEditing ? (
          <>
            <Typography
              size={16}
              weight="600"
              styles={{ marginBottom: "8px" }}
            >
              Title
            </Typography>
            <Input
              placeholder="Blog title"
              value={blog.title}
              style={{ marginBottom: "16px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBlog({ ...blog, title: e.target.value })
              }
            />
          </>
        ) : (
          <Typography
            size={24}
            weight="600"
            styles={{ marginBottom: "24px" }}
          >
            {blog.title}
          </Typography>
        )}

        <Typography size={16} weight="600" styles={{ marginBottom: "8px" }}>
          Content
        </Typography>
        {/* <RichTextEditor /> */}
        <div
          style={{
            border: `solid 1px ${ isEditing ? "var(--text-secondary)" : "#eee" }`,
            padding: "24px",
            borderRadius: "10px",
            minHeight: "100px"
          }}
          className="blog-content"
          contentEditable={isEditing}
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: blog.content}}
        />
      </>
    ) : <Typography styles={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--text-secondary)"}}>Select a blog from the menu to preview here</Typography>}
    </div>
  );
};

export default Blogs;
