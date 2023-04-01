import React,{Component} from "react";
import {withRouter} from "../../helpers/withRouter";
import UserService from "../../services/UserService";
import FeeService from "../../services/FeeService";

class ListFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fees: [],
      totalFee: 0
    }
    this.addFee = this.addFee.bind(this);
    this.editFee = this.editFee.bind(this);
    this.deleteFee = this.deleteFee.bind(this);
  }
  addFee() {
    this.props.router.navigate('/addFee/_add');
  }
  deleteFee(id) {
    FeeService.deleteFee(id).then(res => {
      this.setState({fees: this.state.fees.filter(fee => fee.id !== id)});
    });
  }

  viewFee(id) {
    this.props.router.navigate(`/viewFee/${id}`);
  }

  editFee(id) {
    this.props.router.navigate(`/addFee/${id}`);
  }
  componentDidMount() {
    FeeService.getAllFee().then((res) => {
      this.setState({fees: res.data});
    })
    FeeService.totalFee().then((res)=>{
      this.setState({totalFee: res.data});
    })
  }
  render() {
    return (<div>
      <h2 className="text-center">Fee List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={this.addUser}> Add
          Fee
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">

          <thead>
          <tr>
            <th> Fee name</th>
            <th> Value</th>
            <th> Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.state.fees.map(fee => <tr key={fee.fee_id}>
            <td> {fee.fee_type} </td>
            <td> {fee.fee_value} </td>
            <td>
              <button onClick={() => this.editBuilding(fee.fee_id)}
                      className="btn btn-secondary">Update
              </button>
              <button style={{marginLeft: "10px"}}
                      onClick={() => this.deleteBuilding(
                          fee.fee_id)}
                      className="btn btn-danger">Delete
              </button>
              <button style={{marginLeft: "10px"}}
                      onClick={() => this.viewBuilding(fee.fee_id)}
                      className="btn btn-info">View
              </button>
            </td>
          </tr>)}
          </tbody>
        </table>
        <br/>
        <div className="row">
          <strong>Total Fee: </strong>{this.state.totalFee}
        </div>
      </div>

    </div>)
  }
}

export default withRouter(ListFee)