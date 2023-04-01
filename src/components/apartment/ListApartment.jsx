import React, {Component} from 'react'
import ApartmentService from '../../services/ApartmentService';
import {withRouter} from "../../helpers/withRouter";

class ListApartment extends Component {

  constructor(props) {
    super(props)
    const search = this.props.router.location.search;
    const buildingId = new URLSearchParams(search).get('building');

    this.state = {
      id: buildingId,
      apartments: []
    }
    this.addApartment = this.addApartment.bind(this);
    this.editApartment = this.editApartment.bind(this);
    this.deleteApartment = this.deleteApartment.bind(this);
  }

  deleteApartment(id) {
    ApartmentService.deleteApartment(id).then(res => {
      this.setState({
        apartments: this.state.apartments.filter(
            apartment => apartment.apartment_id !== id)
      });
    });
  }

  viewApartment(id) {
      this.props.router.navigate(`/viewApartment/${id}?building=${this.state.id}`);
  }

  editApartment(id) {
      this.props.router.navigate(`/createApartment/${id}?building=${this.state.id}`);
  }

  componentDidMount() {
    if(this.state.id != null){
      ApartmentService.getAllApartmentinBuilding(this.state.id).then((res) => {
        this.setState({apartments: res.data});
      });
    } else {
      ApartmentService.getAllApartment().then((res) => {
        this.setState({apartments: res.data});
      });
    }
  }

  addApartment() {
      this.props.router.navigate(`/createApartment/_add?building=${this.state.id}`);
  }

  render() {
    return (<div>
      <h2 className="text-center">Apartment in Building</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={this.addApartment}> Add
          Apartment
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">

          <thead>
          <tr>
            <th> Room</th>
            <th> Acreage (m<sup>2</sup>)</th>
            <th> Status</th>
            <th> Action</th>
          </tr>
          </thead>
          <tbody>
          {this.state.apartments.map(
              apartment => <tr key={apartment.apartment_id}>
                <td> {apartment.roomNo} </td>
                <td> {apartment.acreage}</td>
                <td> {apartment.status}</td>
                <td>
                  <button onClick={() => this.editApartment(
                      apartment.apartment_id)}
                          className="btn btn-secondary">Update
                  </button>
                  <button style={{marginLeft: "10px"}}
                          onClick={() => this.deleteApartment(
                              apartment.apartment_id)}
                          className="btn btn-danger">Delete
                  </button>
                  <button style={{marginLeft: "10px"}}
                          onClick={() => this.viewApartment(
                              apartment.apartment_id)}
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

export default withRouter(ListApartment)