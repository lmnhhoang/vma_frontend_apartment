import React, {Component} from "react";
import {withRouter} from "../../helpers/withRouter";
import AprtManageService from "../../services/AprtManageService";

class ListManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manages: [],
      searchRoom: "",
    }
    //this.addManage = this.addManage.bind(this);
    this.editManage = this.editManage.bind(this);
    //this.deleteManage = this.deleteManage.bind(this);
    this.onChangeSearchRoom = this.onChangeSearchRoom.bind(this);
  }
  onChangeSearchRoom(e) {
    const searchRoom = e.target.value;

    this.setState({
      searchRoom: searchRoom,
    });
  }
  // addManage() {
  //   this.props.router.navigate('/createBill/_add');
  // }

  editManage(id) {
    this.props.router.navigate(`/createBill/${id}`);
  }

  // deleteManage(id) {
  //   this.props.router.navigate(`/deleteBill/${id}`);
  // }

  viewBill(id) {
    this.props.router.navigate(`/viewBill/${id}`);
  }

  componentDidMount() {
    AprtManageService.getAllManage().then((res) => {
      this.setState({manages: res.data});
    })
  }

  render() {
    return (<div>
          <h2 className="text-center">Monthly Detail</h2>
          <div className="rows">
            <div className="input-group mb-3">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Search by room title"
                  value={this.state.searchRoom}
                  onChange={this.onChangeSearchRoom}
              />
              <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={console.log('unavailable')}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <table className="table table-striped table-bordered">

              <thead>
              <tr>
                <th> ID</th>
                <th> Apartment</th>
                <th> Electric</th>
                <th> Water</th>
                <th> Created Date</th>
                <th> Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.state.manages.map(manage => <tr key={manage.aprtm_id}>
                <td> {manage.aprtm_id} </td>
                <td> {manage.apartment.roomNo} </td>
                <td> {manage.e_value} </td>
                <td> {manage.w_value} </td>
                <td> {manage.record_date} </td>
                <td>
                  <button onClick={() => this.editBill(manage.aprtm_id)}
                          className="btn btn-secondary">Update
                  </button>
                  <button style={{marginLeft: "10px"}}
                          onClick={() => this.viewBill(manage.aprtm_id)}
                          className="btn btn-info">View
                  </button>
                </td>
              </tr>)}
              </tbody>
            </table>
            <br/>
          </div>
        </div>
    )
  }
}

export default withRouter(ListManage)