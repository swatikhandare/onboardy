import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Card from "../components/Card";
import Blog from "../models/Blog";
import { useBlogsStore } from "../stores";

const StyledIntroduction = styled(Card)`
  min-height: calc(100vh - 125px);

  .tabs-nav {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    margin: auto;
    border-bottom: 1px solid #eee;
    margin-bottom: 32px;
    gap: 20px;
    padding-bottom: 15px;

    .tab {
      padding: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s ease;
      border-radius: 10px;
      color: var(--text-secondary);

      &.active {
        background: #f5f5f8;
        color: inherit;
      }
    }
  }

  .nav-controls {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
  }
`;

const Introduction: React.FunctionComponent = () => {
  const blogs = useBlogsStore((state) => state.blogs);
  const getBlogs = useBlogsStore((state) => state.getBlogs);
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const currentBlogIndex = blogs.findIndex(blog => blog.id === activeBlog?.id)

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    setActiveBlog(blogs[0]);
  }, [blogs]);

  return (
    <StyledIntroduction>
      {!!(blogs.length > 1) && (
        <ul className="tabs-nav">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className={`tab ${blog.id === activeBlog?.id ? "active" : ""}`}
              onClick={() => setActiveBlog(blog)}
            >
              {blog.title}
            </li>
          ))}
        </ul>
      )}
      <div style={{ maxWidth: "768px", width: "100%", margin: "auto" }}>
        {activeBlog && (
          <div
            
            dangerouslySetInnerHTML={{ __html: activeBlog.content }}
          />
        )}
        {!!(blogs.length > 1) && (
          <div className="nav-controls">
            <Button disabled={currentBlogIndex === 0} onClick={() => setActiveBlog(blogs[currentBlogIndex - 1])}>Previous</Button>
            <Button disabled={currentBlogIndex === (blogs.length - 1)} onClick={() => setActiveBlog(blogs[currentBlogIndex + 1])}>Next</Button>
          </div>
        )}
      </div>
    </StyledIntroduction>
  );
};

export default Introduction;
