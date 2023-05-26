const useProfilePosts = async (profileId: string) => {
  const response = await fetch(`http://localhost:3000/api/profilePosts/${profileId}`);
  const data = await response.json();
  return data;
};

export default useProfilePosts;
