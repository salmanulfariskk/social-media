import { useState, useEffect } from "react";
import PostList from "../components/feed/PostList";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [pageContext, setPageContext] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/posts?page=${currentPage}&limit=2`
        );
        setPosts([...posts, ...response.data.posts]);
        setPageContext(response.data.pageContext);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="mt-6">
        {Array.from({ length: 2 })
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="w-[500px] bg-white rounded mb-3 mx-auto"
            >
              <div className="flex items-center p-4">
                <div className="h-10 w-10 animate-pulse bg-[#e4e6eb] rounded-full" />
                <div className="h-6 w-24 rounded-xl animate-pulse bg-[#e4e6eb] ml-2" />
              </div>
              <div className="pt-40 pb-4 px-4 flex justify-evenly">
                <div className="h-6 w-16 rounded-xl animate-pulse bg-[#e4e6eb]" />
                <div className="h-6 w-16 rounded-xl animate-pulse bg-[#e4e6eb]" />
                <div className="h-6 w-16 rounded-xl animate-pulse bg-[#e4e6eb]" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {posts?.length > 0 ? (
        <PostList
          posts={posts}
          pageContext={pageContext}
          setPage={setCurrentPage}
        />
      ) : (
        <div className="text-center mt-10">
          <p className="text-xl mb-4 text-white">No posts available.</p>
          <p className="text-lg mb-4 text-white">
            Do you want to create a new post?
          </p>
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
