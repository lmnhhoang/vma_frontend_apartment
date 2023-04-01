import React, {Component} from 'react'
import BuildingService from '../../services/BuildingService';
import ApartmentService from "../../services/ApartmentService";
import {withRouter} from "../../helpers/withRouter";

class ViewBuilding extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.router.params.id, building: {},
      numOfApartment: 0
    }
    this.viewApartment = this.viewApartment.bind(this);
  }

  viewApartment(id) {
      this.props.router.navigate(`/listApartment?building=${id}`);
  }

  componentDidMount() {
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
          <div className="row">

            <div>
              <label style={{
                marginRight: "10px", fontWeight: 600
              }}> Action:</label>
              <button style={{marginLeft: "10px"}}
                      onClick={() => this.viewApartment(this.state.id)}
                      className="btn btn-info">View Apartment
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>)
  }
}

export default withRouter(ViewBuilding)