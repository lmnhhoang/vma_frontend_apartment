import http from "../http-common";

class BuildingService {

  getAllBuilding() {
    return http.get('/building');
  }

  getBuildingById(buildingId) {
    return http.get(`/building/${buildingId}`);
  }

  createBuilding(building) {
    return http.post('/addBuilding', building);
  }

  updateBuilding(building, buildingId) {
    return http.put(`/addBuilding/${buildingId}`, building);
  }

  deleteBuilding(buildingId) {
    return http.delete(`/deleteBuilding/${buildingId}`);
  }

  findBuildingByTitle(name) {
    return http.get(`/building?name=${name}`);
  }
}

export default new BuildingService();