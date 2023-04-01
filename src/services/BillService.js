import http from "../http-common";

class BillService {

  getAllBuilding() {
    return http.get('/listBill');
  }

  getBuildingById(billId) {
    return http.get(`/listBill/${billId}`);
  }

  createBuilding(bill) {
    return http.post('/addBill', bill);
  }

  updateBuilding(bill, billId) {
    return http.put(`/addBuilding/${billId}`, bill);
  }

  deleteBuilding(billId) {
    return http.delete(`/deleteBuilding/${billId}`);
  }

}

export default new BillService();