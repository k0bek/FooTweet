const useComments = async (postId) => {
  const response = await fetch(`http://localhost:3000/api/comments/${postId}`);
  const data = await response.json();
  return data;
};

export default useComments;
