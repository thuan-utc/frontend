import axios from "axios"
export {
  login
};

async function login(user) {
  const response = await axios.post(`http://localhost:8090/login`, user);
    return response;
}