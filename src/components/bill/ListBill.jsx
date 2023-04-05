import React, {Component} from "react";
import {withRouter} from "../../helpers/withRouter";
import BillService from "../../services/BillService";

class ListBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
    }
    this.addBill = this.addBill.bind(this);
    this.editBill = this.editBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
  }

  addBill() {
    this.props.router.navigate('/createBill/_add');
  }

  editBill(id) {
    this.props.router.navigate(`/createBill/${id}`);
  }

  deleteBill(id) {
    this.props.router.navigate(`/deleteBill/${id}`);
  }

  viewBill(id) {
    this.props.router.navigate(`/viewBill/${id}`);
  }

  componentDidMount() {
    BillService.getAllBill().then((res) => {
      this.setState({bills: res.data});
    })
  }

  render() {
    return (<div>
      <h2 className="text-center">Bill List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={this.addBill}> Add
          Bill
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">

          <thead>
          <tr>
            <th> Bill ID</th>
            <th> Apartment</th>
            <th> Created Date</th>
            <th> Status</th>
            <th> Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.state.bills.map(bill => <tr key={bill.bill_id}>
            <td> {bill.bill_id} </td>
            <td> {bill.apartment_id} </td>
            <td> {bill.createdDate} </td>
            <td> {bill.status} </td>
            <td>
              <button onClick={() => this.editBill(bill.fee_id)}
                      className="btn btn-secondary">Update
              </button>
              <button style={{marginLeft: "10px"}}
                      onClick={() => this.deleteBill(
                          bill.fee_id)}
                      className="btn btn-danger">Delete
              </button>
              <button style={{marginLeft: "10px"}}
                      onClick={() => this.viewBill(bill.fee_id)}
                      className="btn btn-info">View
              </button>
            </td>
          </tr>)}
          </tbody>
        </table>
        <br/>
      </div>

    </div>)
  }
}

export default withRouter(ListBill)