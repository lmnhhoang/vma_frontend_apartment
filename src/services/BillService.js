import http from "../http-common";

class BillService {

  getAllBill() {
    return http.get('/listBill');
  }

  getBillById(billId) {
    return http.get(`/listBill/${billId}`);
  }

  createBill(bill) {
    return http.post('/addBill', bill);
  }

  updateBill(bill, billId) {
    return http.put(`/addBuilding/${billId}`, bill);
  }

  deleteBill(billId) {
    return http.delete(`/deleteBuilding/${billId}`);
  }

}

export default new BillService();