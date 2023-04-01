import http from "../http-common";

class DwellerService {

  getAllDweller() {
    return http.get('/listAllCivil');
  }

  getDwellerById(dwellerId) {
    return http.get(`/listCivil/${dwellerId}`);
  }

  createDweller(user) {
    return http.post('/addCivil', user);
  }

  updateDweller(user, dwellerId) {
    return http.put(`/addCivil/${dwellerId}`, user);
  }

  deleteDweller(dwellerId) {
    return http.delete(`/deleteCivil/${dwellerId}`);
  }

  findByName(name) {
    return http.get(`/listCivil?title=${name}`);
  }

  countByApartment(apartmentId) {
    return http.get(`/countCivil?apartment=${apartmentId}`)
  }

  getByApartment(apartmentId) {
    return http.get(`/listCivil?apartment=${apartmentId}`)
  }
}

export default new DwellerService()