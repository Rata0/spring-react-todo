import axios from "axios";

export const getProfile = async () => {
  const response = await axios.get('http://localhost:4040/profile');
  return response.data;
};
