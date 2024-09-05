import React from 'react';
import Post from './Post';

function PostList({ posts }) {
  return (
    <div className='mb-10'>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default PostList;
