import UserProfile from '../components/profile/UserProfile';

function UserProfilePage() {
  // Mock user profile data
  const user = {
    username: 'user1',
    email: 'user1@example.com',
    followers: 120,
    following: 80,
  };

  return (
    <div className="container mx-auto p-4">
      <UserProfile user={user} />
    </div>
  );
}

export default UserProfilePage;
