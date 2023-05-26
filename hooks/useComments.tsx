const useComments = async (postId: string) => {
  const response = await fetch(`http://localhost:3000/api/comments/${postId}`);
  const data = await response.json();
  return data;
};

export default useComments;
