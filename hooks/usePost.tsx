const usePost = async (postId) => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
  return response;
};

export default usePost;
