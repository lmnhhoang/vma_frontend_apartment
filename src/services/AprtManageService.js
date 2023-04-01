import http from "../http-common";

class AprtManageService {

  getAllBuilding() {
    return http.get('/listMange');
  }

  getBuildingById(manageId) {
    return http.get(`/listMange/${manageId}`);
  }

  createBuilding(manage) {
    return http.post('/addManage', manage);
  }

  updateBuilding(manage, manageId) {
    return http.put(`/addManage/${manageId}`, manage);
  }

  deleteBuilding(manageId) {
    return http.delete(`/deleteManage/${manageId}`);
  }

  findBuildingByTitle(name) {
    return http.get(`/building?name=${name}`);
  }
}

export default new AprtManageService();