const useUser = async (userId: string) => {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`);
  const data = await response.json();
  return data;
};

export default useUser;
