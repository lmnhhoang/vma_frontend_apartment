import React, {Component} from 'react'
import BuildingService from '../../services/BuildingService';
import {withRouter} from "../../helpers/withRouter";

class CreateBuilding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // step 2
      id: this.props.router.params.id, buildingName: '',
    }
    this.changeBuildingNameHandler = this.changeBuildingNameHandler.bind(this);
  }

  // step 3
  componentDidMount() {

    // step 4
    if (this.state.id === '_add') {

    } else {
      BuildingService.getBuildingById(this.state.id).then((res) => {
        let building = res.data;
        this.setState({buildingName: building.building_name});
      });
    }
  }

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    let building = {buildingName: this.state.buildingName};
    console.log('building => ' + JSON.stringify(building));

    // step 5
    if (this.state.id === '_add') {
      BuildingService.createBuilding(building).then(res => {
          this.props.router.navigate('/addBuilding');
      });
    } else {
      BuildingService.updateBuilding(building, this.state.id).then(res => {
          this.props.router.navigate('/addBuilding');
      });
    }
  }

  changeBuildingNameHandler = (event) => {
    this.setState({buildingName: event.target.value});
  }

  cancel() {
      this.props.router.navigate('/building');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className="text-center">Add Building</h3>
    } else {
      return <h3 className="text-center">Update Building</h3>
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
                  <label> Building Name: </label>
                  <input placeholder="Building Name" name="buildingName"
                         className="form-control"
                         value={this.state.buildingName}
                         onChange={this.changeBuildingNameHandler}/>
                </div>
                <br/>
                <button className="btn btn-success"
                        onClick={this.saveOrUpdateEmployee}>Save
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

export default withRouter(CreateBuilding)