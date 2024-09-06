import Post from "./Post";

export default function PostList({ posts, pageContext, setPage }) {
  console.log(posts[0]);
  return (
    <div className="mb-10">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {pageContext?.hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="h-9 px-3 flex items-center justify-center select-none whitespace-nowrap transition-colors text-sm font-semibold rounded-md text-black border border-solid border-[#ddd] hover:bg-black/10"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
