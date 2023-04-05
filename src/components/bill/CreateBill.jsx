import React, {Component} from "react";
import {withRouter} from "../../helpers/withRouter";
import FeeService from "../../services/FeeService";
import BillService from "../../services/BillService";

class CreateBill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.router.params.id,
      apartment_id: '',
      createdDate: `${new Date().toLocaleString()}`,
      e_fee: 0,
      w_fee: 0,
      ex_fee: 0,
      status: 'Payment Process',
      paid_day: ''
    }
    this.changeIdHandler = this.changeIdHandler.bind(this);
    this.changeE_feeHandler = this.changeE_feeHandler.bind(this);
    this.changeW_feeHandler = this.changeW_feeHandler.bind(this);
    this.changeEx_feeHandler = this.changeEx_feeHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changePaidHandler = this.changePaidHandler.bind(this);
  }

  changeIdHandler = (event) => {
    this.setState({apartment_id: event.target.value});
  }
  changeE_feeHandler = (event) => {
    this.setState({e_fee: event.target.value});
  }
  changeW_feeHandler = (event) => {
    this.setState({w_fee: event.target.value});
  }
  changeEx_feeHandler = (event) => {
    this.setState({ex_fee: event.target.value});
  }
  changeStatusHandler = (event) => {
    this.setState({status: event.target.value});
  }
  changePaidHandler = (event) => {
    this.setState({paid_day: event.target.value});
  }

  cancel() {
    this.props.router.navigate('/listBill');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className="text-center">Add Bill</h3>
    } else {
      return <h3 className="text-center">Update Bill</h3>
    }
  }

  saveOrUpdateBill = (e) => {
    e.preventDefault();
    let bill = {
      apartment_id: this.state.apartment_id,
      createdDate: this.state.createdDate,
      e_fee: this.state.e_fee,
      w_fee: this.state.w_fee,
      ex_fee: this.state.ex_fee,
      status: this.state.status,
      paid_day: this.state.paid_day
    };
    console.log('bill => ' + JSON.stringify(bill));
    if (this.state.id === '_add') {
      BillService.createBill(bill).then(res => {
        this.props.router.navigate('/listBill');
      });
    } else {
      BillService.updateBill(bill, this.state.id).then(res => {
        this.props.router.navigate('/listBill');
      });
    }
  }
  render() {
    return (<div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {this.getTitle()}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> Apartment Id: </label>
                  <input placeholder="Fee Name" name="feeName"
                         className="form-control"
                         value={this.state.apartment_id}
                         onChange={this.changeIdHandler}/>
                </div>
                <div className="form-group">
                  <label> Created Date: </label>
                  <input type={"text"} name="value"
                         className="form-control"
                         value={this.state.createdDate}
                         disabled={true}/>
                </div>
                <div className="form-group">
                  <label> Electric Fee: </label>
                  <div className="input-group">
                    <input type={"number"} name="value"
                           className="form-control"
                           value={this.state.e_fee}
                           disabled={true}/>
                    <button className="btn btn-info"
                            onClick={this.changeE_feeHandler}>Get Electric fee
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label> Electric Fee: </label>
                  <div className="input-group">
                    <input type={"number"} name="value"
                           className="form-control"
                           value={this.state.w_fee}
                           disabled={true}/>
                    <button className="btn btn-info"
                            onClick={this.changeW_feeHandler}>Get Water fee
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label> Extra Fee: </label>
                  <div className="input-group">
                    <input type={"number"} name="value"
                           className="form-control"
                           value={this.state.ex_fee}
                           disabled={true}/>
                    <button className="btn btn-info"
                            onClick={this.changeEx_feeHandler}>Get Extra fee
                    </button>
                  </div>
                </div>
                {this.state.id === '_add' ? (
                    <div>
                      <div className="form-group">
                        <label> Status: </label>
                        <input type={"text"} name="value"
                               className="form-control"
                               value={this.state.status}
                               disabled={true}/>
                      </div>
                      <div className="form-group">
                        <label> Paid Day: </label>
                        <input
                            type={"date"} placeholder="Fee Name" name="feeName"
                            className="form-control"
                            value={this.state.paid_day}
                            onChange={this.changePaidHandler} disabled={true}/>
                      </div>
                    </div>
                ) : (
                    <div>
                      <div className="form-group">
                        <label> Status: </label>
                        <select className="form-select"
                                value={this.state.selectedRole}
                                onChange={this.changeStatusHandler}>
                          <option value="Paid">
                            Paid
                          </option>
                          <option value="Payment Process">
                            Payment Process
                          </option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label> Paid Day: </label>
                        <input
                            type={"date"} placeholder="Fee Name" name="feeName"
                            className="form-control"
                            value={this.state.paid_day}
                            onChange={this.changePaidHandler}/>
                      </div>
                    </div>
                )}
                <br/>
                <button className="btn btn-success"
                        onClick={this.saveOrUpdateBill}>Save
                </button>
                <button className="btn btn-danger"
                        onClick={this.cancel.bind(this)}
                        style={{marginLeft: "10px"}}>Cancel
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>)
  }
}

export default withRouter(CreateBill)