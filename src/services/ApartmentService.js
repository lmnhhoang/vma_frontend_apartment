import http from "../http-common";

class ApartmentService {

  getAllApartment() {
    return http.get('/listApartment');
  }
  getAllApartmentinBuilding(building_id) {
    return http.get(`/listApartment?building=${building_id}`);
  }

  getApartmentById(ApartmentId) {
    return http.get(`/listApartment/${ApartmentId}`);
  }

  createApartment(apartment) {
    return http.post('/addApartment', apartment);
  }

  updateBuilding(apartment, ApartmentId) {
    return http.put(`/addApartment/${ApartmentId}`, apartment);
  }

  deleteApartment(ApartmentId) {
    return http.delete(`/deleteApartment/${ApartmentId}`);
  }

  findApartmentByTitle(name) {
    return http.get(`/listApartment?name=${name}`);
  }
  countApartmentByBuilding(building_id) {
    return http.get(`/countApartment?building=${building_id}`);
  }
}

export default new ApartmentService();