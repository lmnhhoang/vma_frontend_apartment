import http from "../http-common";

class UserService {

  getAllUser() {
    return http.get('/user');
  }

  getUserById(userId) {
    return http.get(`/user/${userId}`);
  }

  createUser(user) {
    return http.post('/addUser', user);
  }

  updateUser(user, userId) {
    return http.put(`/addUser/${userId}`, user);
  }

  deleteUser(userId) {
    return http.delete(`/deleteUser/${userId}`);
  }

  findByTitle(title) {
    return http.get(`/user?title=${title}`);
  }
}

export default new UserService()