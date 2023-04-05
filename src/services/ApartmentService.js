import http from "../http-common";

class ApartmentService {

  getAllApartment() {
    return http.get('/listAll');
  }
  getApartmentWithPaging(params){
    return http.get('/getApartment',{params});
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

  updateApartment(apartment, ApartmentId) {
    return http.put(`/addApartment/${ApartmentId}`, apartment);
  }

  deleteApartment(ApartmentId) {
    return http.delete(`/deleteApartment/${ApartmentId}`);
  }

  findApartmentByTitle(name) {
    return http.get(`/listApartment?name=${name}`);
  }

  countApartmentByBuilding(ApartmentId) {
    return http.get(`/countApartment?apartment=${ApartmentId}`);
  }
}

export default new ApartmentService();