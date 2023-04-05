import React, {Component} from 'react'
import ApartmentService from "../../services/ApartmentService";
import DwellerService from "../../services/DwellerService";
import {withRouter} from "../../helpers/withRouter";
import AuthService from "../../services/auth/auth.service";

class ViewApartment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.router.params.id,
      apartment: {},
      numOfDweller: 0,
      dwellers: []
    }
    this.addDweller = this.addDweller.bind(this);
    this.editDweller = this.editDweller.bind(this);
    this.deleteDweller = this.deleteDweller.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    ApartmentService.getApartmentById(this.state.id).then(res => {
      this.setState({apartment: res.data});
    });
    DwellerService.countByApartment(this.state.id).then(res => {
      this.setState({numOfDweller: res.data});
    });
    DwellerService.getByApartment(this.state.id).then(res => {
      this.setState({dwellers: res.data});
    });
  }

  viewDweller(id) {
    this.props.router.navigate(`/viewDweller/${id}`);
  }

  deleteDweller(id) {
    DwellerService.deleteDweller(id).then(res => {
      this.setState({
        dwellers: this.state.dwellers.filter(dweller => dweller.id !== id)
      });
    });
  }

  editDweller(id) {
    this.props.router.navigate(`/addDweller/${id}`);
  }

  addDweller() {
    this.props.router.navigate('/addDweller/_add');
  }

  render() {

    return (<div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View Apartment Details</h3>
        <div className="card-body">
          <div className="row">
            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Room
              :</label>{this.state.apartment.roomNo}</div>
          </div>
          <div className="row">

            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Acreage
              :</label>{this.state.apartment.acreage} m<sup>2</sup></div>
          </div>
          <div className="row">

            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Number of Rooms
              :</label>{this.state.apartment.numOfRoom}</div>
          </div>
          <div className="row">

            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Status
              :</label>{this.state.apartment.status}</div>
          </div>
          <div className="row">

            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Description
              :</label>{this.state.apartment.description}</div>
          </div>
          <div className="row" style={{marginBottom: "10px"}}>

            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Presenter
              email:</label>{this.state.apartment.presenter_email != ''
                ? this.state.apartment.presenter_email : 'None'}
            </div>
          </div>
          <div className="row" style={{marginBottom: "10px"}}>

            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Number of
              Dwellers:</label>{this.state.numOfDweller}
            </div>
          </div>
        </div>
        {(this.state.showModeratorBoard || this.state.showAdminBoard) ? (
            <div className="card-body">
              <div className="row">
                <button className="btn btn-primary"
                        onClick={this.addDweller}> Add
                  User
                </button>
              </div>
              <br></br>
              <div className="row">
                <table className="table table-striped table-bordered">

                  <thead>
                  <tr>
                    <th> CID</th>
                    <th> Name</th>
                    <th> Gender</th>
                    <th> Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.dwellers.map(
                      dweller => <tr key={dweller.dweller_id}>
                        <td> {dweller.cid} </td>
                        <td> {dweller.fullname}</td>
                        <td> {dweller.gender}</td>
                        <td>
                          <button
                              onClick={() => this.editDweller(
                                  dweller.dweller_id)}
                              className="btn btn-secondary">Update
                          </button>
                          <button style={{marginLeft: "10px"}}
                                  onClick={() => this.deleteDweller(
                                      dweller.dweller_id)}
                                  className="btn btn-danger">Delete
                          </button>
                          <button style={{marginLeft: "10px"}}
                                  onClick={() => this.viewDweller(
                                      dweller.dweller_id)}
                                  className="btn btn-info">View
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>

              </div>

            </div>) : (<div>
              <button style={{marginLeft: "10px"}}
                      onClick={() => this.requestRent(this.state.id)}
                      className="btn btn-danger">Request Rent
              </button>
            </div>)}
      </div>
    </div>)
  }
}

export default withRouter(ViewApartment)