import React, {Component} from 'react'
import ApartmentService from '../../services/ApartmentService';
import {withRouter} from "../../helpers/withRouter";
import AuthService from "../../services/auth/auth.service";
import {Pagination} from "@mui/material";


class ListApartment extends Component {

  constructor(props) {
    super(props)
    const search = this.props.router.location.search;
    const buildingId = new URLSearchParams(search).get('building');

    this.state = {
      building: buildingId,
      apartments: [],
      currentApartment: null,
      currentIndex: -1,
      searchRoom: "",

      page: 1,
      count: 0,
      pageSize: 5,
    }
    this.pageSizes = [5, 10, 15];

    this.onChangeSearchRoom = this.onChangeSearchRoom.bind(this);
    this.retrieveDatas = this.retrieveDatas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveApartment = this.setActiveApartment.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.addApartment = this.addApartment.bind(this);
    this.editApartment = this.editApartment.bind(this);
    this.deleteApartment = this.deleteApartment.bind(this);
  }
  addApartment() {
    this.props.router.navigate(
        `/createApartment/_add?building=${this.state.building}`);
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
    this.props.router.navigate(
        `/viewApartment/${id}?building=${this.state.building}`);
  }

  editApartment(id) {
    this.props.router.navigate(
        `/createApartment/${id}?building=${this.state.building}`);
  }
  getRequestParams(searchRoom, page, pageSize,building) {
    let params = {};

    if (searchRoom) {
      params["room"] = searchRoom;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }
    if (building) {
      params["building"] = building;
    }

    return params;
  }
  retrieveDatas() {
    const { searchRoom, page, pageSize ,building} = this.state;
    const params = this.getRequestParams(searchRoom, page, pageSize,building);

    ApartmentService.getApartmentWithPaging(params)
    .then((response) => {
      const { apartments, totalPages } = response.data;

      this.setState({
        apartments: apartments,
        count: totalPages,
      });
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  }
  onChangeSearchRoom(e) {
    const searchRoom = e.target.value;

    this.setState({
      searchRoom: searchRoom,
    });
  }
  handlePageChange(event, value) {
    this.setState(
        {
          page: value,
        },
        () => {
          this.retrieveDatas();
        }
    );
  }
  handlePageSizeChange(event) {
    this.setState(
        {
          pageSize: event.target.value,
          page: 1
        },
        () => {
          this.retrieveDatas();
        }
    );
  }
  refreshList() {
    this.retrieveDatas();
    this.setState({
      currentApartment: null,
      currentIndex: -1,
    });
  }
  setActiveApartment(apartment, index) {
    this.setState({
      currentTutorial: apartment,
      currentIndex: index,
    });
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
    // if (this.state.building != null) {
    //   ApartmentService.getAllApartmentinBuilding(this.state.building).then((res) => {
    //     this.setState({apartments: res.data});
    //   });
    // } else {
    //   ApartmentService.getAllApartment().then((res) => {
    //     this.setState({apartments: res.data});
    //   });
    // }
    this.retrieveDatas()
  }

  render() {
    const {
      searchRoom,
      apartments,
      currentApartment,
      currentIndex,
      page,
      count,
      pageSize,
    } = this.state;
    return (<div>
      <h2 className="text-center">Apartment in Building</h2>
      <div className="row">
        <div className="input-group mb-3">
          <input
              type="text"
              className="form-control"
              placeholder="Search by room title"
              value={searchRoom}
              onChange={this.onChangeSearchRoom}
          />
          <div className="input-group-append">
            <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveDatas}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {(this.state.showModeratorBoard || this.state.showAdminBoard) ? (
          <div className="row">
            <button className="btn btn-primary" onClick={this.addApartment}> Add
              Apartment
            </button>
          </div>) : ('')}
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
                <td style={{display: "flex"}}>
                  <button style={{marginLeft: "10px"}}
                          onClick={() => this.viewApartment(
                              apartment.apartment_id)}
                          className="btn btn-info">View
                  </button>
                  {(this.state.showModeratorBoard || this.state.showAdminBoard)
                      ? (<div>
                        <button onClick={() => this.editApartment(
                            apartment.apartment_id)}
                                className="btn btn-secondary">Update
                        </button>
                        <button style={{marginLeft: "10px"}}
                                onClick={() => this.deleteApartment(
                                    apartment.apartment_id)}
                                className="btn btn-danger">Delete
                        </button>
                      </div>) : (<div>
                        <button style={{marginLeft: "10px"}}
                                onClick={() => this.requestRent(
                                    apartment.apartment_id)}
                                className="btn btn-danger">Request Rent
                        </button>
                      </div>)}

                </td>
              </tr>)}
          </tbody>
        </table>
        <div className="row">
          <div className="col-8">
            <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={this.handlePageChange}
            />
          </div>
          <div className="col-4 mt-4">
            {"Items per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
              ))}
            </select>
          </div>
        </div>
      </div>

    </div>)
  }
}

export default withRouter(ListApartment)