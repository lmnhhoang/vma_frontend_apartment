import React, {Component} from 'react'
import {withRouter} from "../../helpers/withRouter";
import DwellerService from "../../services/DwellerService";

class ListDweller extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dwellers: []
    }
    this.addDweller = this.addDweller.bind(this);
    this.editDweller = this.editDweller.bind(this);
    this.deleteDweller = this.deleteDweller.bind(this);
  }

  componentDidMount() {
    DwellerService.getAllDweller().then(res => {
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
      <h2 className="text-center">Dwellers</h2>
      <div className="card-body">
        <div className="row">
          <button className="btn btn-primary" onClick={this.addDweller}> Add
            Dweller
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
            {
              this.state.dwellers.map(
                  dweller =>
                      <tr key={dweller.dweller_id}>
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
                      </tr>
              )
            }
            </tbody>
          </table>

        </div>

      </div>

    </div>)
  }
}

export default withRouter(ListDweller)