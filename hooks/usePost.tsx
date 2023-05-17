const usePost = async (postId, single) => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
  const data = await response.json();
  return data;
};

export default usePost;
