import axios from "axios";

let accessToken;
const user = JSON.parse(localStorage.getItem('user'));
if (user && user.accessToken) {
   accessToken = user.accessToken
}

export default axios.create({
  baseURL: "http://localhost:8081/api/v1",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  }
});