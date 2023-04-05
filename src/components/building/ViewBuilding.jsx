import React, {Component} from 'react'
import BuildingService from '../../services/BuildingService';
import ApartmentService from "../../services/ApartmentService";
import {withRouter} from "../../helpers/withRouter";
import AuthService from "../../services/auth/auth.service";

class ViewBuilding extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.router.params.id, building: {}, numOfApartment: 0
    }
    this.viewApartment = this.viewApartment.bind(this);
  }

  viewApartment(id) {
    this.props.router.navigate(`/listApartment?building=${id}`);
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
    BuildingService.getBuildingById(this.state.id).then(res => {
      this.setState({building: res.data});
    });
    ApartmentService.countApartmentByBuilding(this.state.id).then(res => {
      this.setState({numOfApartment: res.data});
    })
  }

  render() {

    return (<div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View Building Details</h3>
        <div className="card-body">
          <div className="row">

            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Building
              Name:</label>{this.state.building.building_name}</div>
          </div>
          <div className="row" style={{marginBottom: "10px"}}>

            <div><label
                style={{marginRight: "10px", fontWeight: 600}}> Number of
              Apartment:</label>{this.state.numOfApartment}
            </div>
          </div>
          <br/>
          <div className="row row-cols-auto">
            <button style={{marginRight: 10}}
                    onClick={() => this.viewApartment(this.state.id)}
                    className="btn btn-info">View All Apartment
            </button>
            {(this.state.showModeratorBoard||this.state.showAdminBoard)?(
                <div>
                  <button onClick={() => this.editBuilding(this.state.id)}
                          className="btn btn-secondary">Update
                  </button>
                  <button style={{marginLeft: "10px"}}
                          onClick={() => this.deleteBuilding(this.state.id)}
                          className="btn btn-danger">Delete
                  </button>
                </div>
            ) : ('')}
          </div>
        </div>

      </div>
    </div>)
  }
}

export default withRouter(ViewBuilding)