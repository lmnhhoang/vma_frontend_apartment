import React, {Component} from 'react'
import BuildingService from '../../services/BuildingService';
import {withRouter} from "../../helpers/withRouter";

class ListBuilding extends Component {

  constructor(props) {
    super(props)

    this.state = {
      buildings: []
    }
    this.addBuilding = this.addBuilding.bind(this);
    this.editBuilding = this.editBuilding.bind(this);
    this.deleteBuilding = this.deleteBuilding.bind(this);
  }

  deleteBuilding(id) {
    BuildingService.deleteBuilding(id).then(res => {
      this.setState({
        buildings: this.state.buildings.filter(building => building.id !== id)
      });
    });
  }

  viewBuilding(id) {
    this.props.router.navigate(`/viewBuilding/${id}`);
  }

  editBuilding(id) {
    this.props.router.navigate(`/addBuilding/${id}`);
  }

  componentDidMount() {
    BuildingService.getAllBuilding().then((res) => {
      this.setState({buildings: res.data});
    });
  }

  addBuilding() {
    this.props.router.navigate('/addBuilding/_add');
  }

  render() {
    return (<div>
      <h2 className="text-center">Building List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={this.addBuilding}> Add
          Building
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">

          <thead>
          <tr>
            <th> Building Name</th>
            <th> Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.state.buildings.map(building => <tr key={building.building_id}>
            <td> {building.building_name} </td>
            <td>
              <button onClick={() => this.editBuilding(building.building_id)}
                      className="btn btn-secondary">Update
              </button>
              {/*<button style={{marginLeft: "10px"}}*/}
              {/*        onClick={() => this.deleteBuilding(*/}
              {/*            building.building_id)}*/}
              {/*        className="btn btn-danger">Delete*/}
              {/*</button>*/}
              <button style={{marginLeft: "10px"}}
                      onClick={() => this.viewBuilding(building.building_id)}
                      className="btn btn-info">View
              </button>
            </td>
          </tr>)}
          </tbody>
        </table>

      </div>

    </div>)
  }
}

export default withRouter(ListBuilding)