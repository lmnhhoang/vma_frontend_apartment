import http from "../http-common";

class AprtManageService {

  getAllManage() {
    return http.get('/listManage');
  }

  getManageById(manageId) {
    return http.get(`/listManage/${manageId}`);
  }

  createManage(manage) {
    return http.post('/addManage', manage);
  }

  updateManage(manage, manageId) {
    return http.put(`/addManage/${manageId}`, manage);
  }

  deleteManage(manageId) {
    return http.delete(`/deleteManage/${manageId}`);
  }

  findManageByTitle(name) {
    return http.get(`/manage?name=${name}`);
  }
}

export default new AprtManageService();