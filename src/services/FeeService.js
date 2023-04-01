import http from "../http-common";

class FeeService {

  getAllFee() {
    return http.get('/fee');
  }

  getFeeById(feeId) {
    return http.get(`/fee/${feeId}`);
  }

  createFee(fee) {
    return http.post('/addFee', fee);
  }

  updateFee(fee, feeId) {
    return http.put(`/addFee/${feeId}`);
  }

  deleteFee(feeId) {
    return http.delete(`/deleteFee/${feeId}`);
  }

  totalFee() {
    return http.get("/fee/total");
  }
}

export default new FeeService();