import http from "../http-common";

class DwellerService {

  getAllDweller() {
    return http.get('/listCivil');
  }

  getDwellerById(userId) {
    return http.get(`/listCivil/${userId}`);
  }

  createDweller(user) {
    return http.post('/addCivil', user);
  }

  updateDweller(user, userId) {
    return http.put(`/addCivil/${userId}`, user);
  }

  deleteDweller(userId) {
    return http.delete(`/deleteCivil/${userId}`);
  }

  findByName(name) {
    return http.get(`/listCivil?title=${name}`);
  }
  countByBuilding(buildingId){
    return http.get(`/listCivil?building=${buildingId}`)
  }
}

export default new DwellerService()