import axios from "axios";
import AuthService from "./AuthService";

export const fetchTodos = async () => {
  const response = await axios.get('http://localhost:4040/todos', {
    headers: {
      Authorization: `Bearer ${AuthService.getToken()}`
    }
  });
  return response.data;
};