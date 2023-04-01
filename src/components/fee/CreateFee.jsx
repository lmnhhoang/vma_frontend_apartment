import React, {Component} from "react";
import {withRouter} from "../../helpers/withRouter";
import FeeService from "../../services/FeeService";

class CreateFee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.router.params.id,
      fee_type: '',
      value: 0
    }
    this.changeFeeNameHandler = this.changeFeeNameHandler.bind(this);
    this.changeFeeValueHandler = this.changeFeeValueHandler.bind(this);
  }

  componentDidMount() {
    if (this.state.id === '_add') {

    } else {
      FeeService.getFeeById(this.state.id).then((res) => {
        let fee = res.data;

        this.setState({
          fee_type: fee.fee_type, value: fee.fee_value
        });
      })
    }
  }

  saveOrUpdateFee = (e) => {
    e.preventDefault();
    let fee = {fee_type: this.state.fee_type, fee_value: this.state.value};
    console.log('fee => ' + JSON.stringify(fee));
    if (this.state.id === '_add') {
      FeeService.createFee(fee).then(res => {
        this.props.router.navigate('/addFee');
      });
    } else {
      FeeService.updateFee(fee, this.state.id).then(res => {
        this.props.router.navigate('/addFee');
      });
    }
  }

  changeFeeNameHandler = (event) => {
    this.setState({fee_type: event.target.value});
  }
  changeFeeValueHandler = (event) => {
    this.setState({value: event.target.value});
  }

  cancel() {
    this.props.router.navigate('/listFee');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className="text-center">Add Fee</h3>
    } else {
      return <h3 className="text-center">Update Fee</h3>
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
                  <label> Fee Name: </label>
                  <input placeholder="Fee Name" name="feeName"
                         className="form-control"
                         value={this.state.fee_type}
                         onChange={this.changeFeeNameHandler}/>
                </div>
                <div className="form-group">
                  <label> Value: </label>
                  <input type={"number"} name="value"
                         className="form-control"
                         value={this.state.value}
                         onChange={this.changeFeeValueHandler}/>
                </div>
                <br/>
                <button className="btn btn-success"
                        onClick={this.saveOrUpdateFee}>Save
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

export default withRouter(CreateFee)