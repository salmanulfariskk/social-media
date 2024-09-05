import React, { useState, useEffect } from "react";
import PostList from "../components/feed/PostList";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="text-center mt-10">
          <p className="text-xl mb-4 text-white">No posts available.</p>
          <p className="text-lg mb-4 text-white">Do you want to create a new post?</p>
          <Link to="/add-post">
            <button className="p-2 text-white rounded-md active:scale-95 bg-fuchsia-700">
              Add Post
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
