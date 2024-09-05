import React from 'react';
import PostList from '../components/feed/PostList';

const mockPosts = [
  {
    id: 1,
    username: 'user1',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMLBJQcs8qS1dSICQfj1e8BHQh5Cnbfna_Y_6ueaPUhKU5esht',
    caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit soluta quam, veniam illum consequuntur ut eius velit ex doloremque cum nemo expedita dignissimos quod molestiae maiores autem est cumque culpa?',
    
    likes: 12,
  }
  ,
  {
    id: 2,
    username: 'user2',
    imageUrl: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSS1nO0q_mHLaAa2IgxX7yABEgX9CgOeB-5j0RaoMDwnwAP-6Mv9ZpA3Wrh-PNfbO5p6RsaoA2SxHRNK5s',
    caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit soluta quam, veniam illum consequuntur ut eius velit ex doloremque cum nemo expedita dignissimos quod molestiae maiores autem est cumque culpa?',
    likes: 34,
  },
];

function Home() {
  return (
    <div className="container mx-auto p-4">
      <PostList posts={mockPosts} />
    </div>
  );
}

export default Home;


