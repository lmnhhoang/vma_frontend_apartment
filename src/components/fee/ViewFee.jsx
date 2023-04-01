import React, {Component} from "react";
import {withRouter} from "../../helpers/withRouter";
import feeService from "../../services/FeeService";

class ViewFee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.router.params.id, fee: {}
    }
  }

  componentDidMount() {
    feeService.getFeeById(this.state.id).then(res => {
      this.setState({fee: res.data});
    })
  }

  render() {
    return (<div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View Fee Details</h3>
        <div className="card-body">
          <div className="row">
            <div><label style={{marginRight: 10}}> Fee
              Name: </label>{this.state.fee.fee_type}</div>
          </div>
          <div className="row">
            <div><label
                style={{marginRight: 10}}> Value: </label>{this.state.fee.fee_value}
            </div>
          </div>
        </div>

      </div>
    </div>)
  }
}

export default withRouter(ViewFee)