import React, {Component} from 'react'
import ApartmentService from "../../services/ApartmentService";
import {withRouter} from "../withRouter";

class ViewApartment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.router.params.id, apartment: {}, numOfDweller: 0
    }
  }

  componentDidMount() {
    ApartmentService.getApartmentById(this.state.id).then(res => {
      this.setState({apartment: res.data});
    });
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
                style={{marginRight: "10px", fontWeight: 600}}> Number of
              Dwellers:</label>{this.state.numOfDweller}
            </div>
          </div>
        </div>

      </div>
    </div>)
  }
}

export default withRouter(ViewApartment)