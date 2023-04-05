import React, {Component} from 'react'
import ApartmentService from "../../services/ApartmentService";
import {withRouter} from "../../helpers/withRouter";

class CreateApartment extends Component {
  constructor(props) {
    super(props)
    const search = this.props.router.location.search;
    const buildingId = new URLSearchParams(search).get('building');

    this.state = {
      // step 2
      id: this.props.router.params.id,
      in_building: buildingId,
      roomNo: '',
      acreage: '',
      numOfRoom: '',
      status: '',
      description: '',
      building_id: '',
      presenter_email: '',
      selectedStatus: 'Trống'
    }
    this.changeRoomNoHandler = this.changeRoomNoHandler.bind(this);
    this.changeAcreageHandler = this.changeAcreageHandler.bind(this);
    this.changeNumOfRoomHandler = this.changeNumOfRoomHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    //this.saveOrUpdateApartment = this.saveOrUpdateApartment().bind(this);
  }

  componentDidMount() {

    // step 4
    if (this.state.id === '_add') {
      this.setState({status: this.state.selectedStatus})
    } else {
      ApartmentService.getApartmentById(this.state.id).then((res) => {
        let apartment = res.data;
        this.setState({
          roomNo: apartment.roomNo,
          acreage: apartment.acreage,
          numOfRoom: apartment.numOfRoom,
          status: apartment.status,
          presenter_email: apartment.presenter_email,
          description: apartment.description,
          building_id: apartment.building_id
        });
      });
    }
  }

  saveOrUpdateApartment = (e) => {
    e.preventDefault();
    let apartment = {
      roomNo: this.state.roomNo,
      acreage: this.state.acreage,
      numOfRoom: this.state.numOfRoom,
      status: this.state.status,
      presenter_email: this.state.presenter_email,
      description: this.state.description,
      building_id: this.state.in_building
    };
    console.log('apartment => ' + JSON.stringify(apartment));

    // step 5
    if (this.state.id === '_add') {
      ApartmentService.createApartment(apartment).then(res => {
          this.props.router.navigate(
            `/listApartment?building=${this.state.in_building}`);
      });
    } else {
      ApartmentService.updateApartment(apartment, this.state.id).then(res => {
          this.props.router.navigate(
            `/listApartment?building=${this.state.in_building}`);
      });
    }
  }
  changeRoomNoHandler = (event) => {
    this.setState({roomNo: event.target.value});
  }
  changeAcreageHandler = (event) => {
    this.setState({acreage: event.target.value});
  }
  changeNumOfRoomHandler = (event) => {
    this.setState({numOfRoom: event.target.value});
  }
  changeStatusHandler = (event) => {
    this.setState(
        {status: event.target.value, selectedStatus: event.target.value});
  }
  changeDescriptionHandler = (event) => {
    this.setState({description: event.target.value});
  }
  changeEmailHandler = (event) => {
    this.setState({presenter_email: event.target.value})
  }
  cancel() {
      this.props.router.navigate(`/listApartment?building=${this.state.in_building}`);
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className="text-center">Add Apartment</h3>
    } else {
      return <h3 className="text-center">Update Apartment</h3>
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
                  <label>ID: </label>
                  <input placeholder="ID" name="id"
                         className="form-control"
                         value={this.state.id}
                         disabled/>
                </div>
                <div className="form-group">
                  <label> Room No: </label>
                  <input placeholder="Room No" name="roomNo"
                         className="form-control"
                         value={this.state.roomNo}
                         onChange={this.changeRoomNoHandler}/>
                </div>
                <div className="form-group">
                  <label> Acreage: </label>
                  <input placeholder="Acreage" name="acreage"
                         className="form-control"
                         value={this.state.acreage}
                         onChange={this.changeAcreageHandler}/>
                </div>
                <div className="form-group">
                  <label> Number of Rooms: </label>
                  <input placeholder="Number of Rooms" name="numOfRoom"
                         className="form-control"
                         value={this.state.numOfRoom}
                         onChange={this.changeNumOfRoomHandler}/>
                </div>
                <div className="form-group">
                  <label> Presenter email: </label>
                  <input placeholder="Presenter email" name="numOfRoom"
                         className="form-control"
                         value={this.state.presenter_email}
                         onChange={this.changeEmailHandler}/>
                </div>
                <div className="form-group">
                  <label> Status: </label>
                  <select className="form-select"
                          value={this.state.selectedStatus}
                          onChange={this.changeStatusHandler}>
                    <option value="Trống">
                      Trống
                    </option>
                    <option value="Cho thuê">
                      Cho thuê
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label> Description: </label>
                  <input placeholder="Description" name="description"
                         className="form-control"
                         value={this.state.description}
                         onChange={this.changeDescriptionHandler}/>
                </div>
                <div className="form-group">
                  <label>Building ID: </label>
                  <input placeholder="Building ID" name="building_id"
                         className="form-control"
                         value={this.state.in_building}
                         disabled/>
                </div>
                <br/>
                <button className="btn btn-success"
                        onClick={this.saveOrUpdateApartment}>Save
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

export default withRouter(CreateApartment)