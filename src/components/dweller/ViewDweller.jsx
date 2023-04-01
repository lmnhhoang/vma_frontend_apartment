import React, {Component} from "react";
import {withRouter} from "../../helpers/withRouter";
import DwellerService from "../../services/DwellerService";

class ViewDweller extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.router.params.id, dweller: {}
    }
  }

  componentDidMount() {
    DwellerService.getDwellerById(this.state.id).then(res => {
      this.setState({dweller: res.data});

    })
  }

  render() {
    return (<div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View Dweller Details</h3>
        <div className="card-body">
          <div className="row">
            <div><label style={{marginRight: 10}}>
              CID: </label>{this.state.dweller.cid}</div>
          </div>
          <div className="row">
            <div><label style={{marginRight: 10}}>
              Name: </label>{this.state.dweller.fullname}</div>
          </div>
          <div className="row">
            <div><label
                style={{marginRight: 10}}> Email: </label>{this.state.dweller.email}
            </div>
          </div>
          <div className="row">
            <div><label
                style={{marginRight: 10}}> Phone: </label>{this.state.dweller.phone}
            </div>
          </div>
          <div className="row">
            <div><label
                style={{marginRight: 10}}> Birthday: </label>{this.state.dweller.birthday}
            </div>
          </div>
          <div className="row">
            <div><label
                style={{marginRight: 10}}> Gender: </label>{this.state.dweller.gender}
            </div>
          </div>
        </div>

      </div>
    </div>)
  }
}

export default withRouter(ViewDweller)