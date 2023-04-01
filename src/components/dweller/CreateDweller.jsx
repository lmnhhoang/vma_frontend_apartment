import React,{Component} from "react";
import {withRouter} from "../../helpers/withRouter";
import ApartmentService from "../../services/ApartmentService";
import DwellerService from "../../services/DwellerService";

class CreateDweller extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // step 2
      id: this.props.router.params.id,
      cid: '',
      fullname: '',
      email: '',
      phone: '',
      birthday: '',
      gender: '',
      apartment_id: '',
      selectedGender: 'Nam'
    }
    this.changeCidHandler = this.changeCidHandler.bind(this);
    this.changeFullnameHandler = this.changeFullnameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changeBirthdayHandler = this.changeBirthdayHandler.bind(this);
    this.changeGenderHandler = this.changeGenderHandler.bind(this);
    this.changeAIHandler = this.changeAIHandler.bind(this);
    this.saveOrUpdateDweller = this.saveOrUpdateDweller.bind(this);
  }
  saveOrUpdateDweller = (e) => {
    e.preventDefault();
    let dweller = {
      cid: this.state.cid,
      fullname: this.state.fullname,
      email: this.state.email,
      phone: this.state.phone,
      birthday: this.state.birthday,
      gender: this.state.gender,
      apartment_id: this.state.apartment_id
    };
    console.log('dweller => ' + JSON.stringify(dweller));

    // step 5
    if (this.state.id === '_add') {
      DwellerService.createDweller(dweller).then(res => {
        this.props.router.navigate(
            `/listDweller`);
      });
    } else {
      DwellerService.updateDweller(dweller, this.state.id).then(res => {
        this.props.router.navigate(
            `/listDweller`);
      });
    }
  }
  changeCidHandler = (event) => {
    this.setState(
        {cid: event.target.value});
  }
  changeFullnameHandler = (event) => {
    this.setState(
        {fullname: event.target.value});
  }
  changeEmailHandler = (event) => {
    this.setState(
        {email: event.target.value});
  }
  changePhoneHandler = (event) => {
    this.setState(
        {phone: event.target.value});
  }
  changeBirthdayHandler = (event) => {
    this.setState(
        {birthday: event.target.value});
  }
  changeGenderHandler = (event) => {
    this.setState(
        { selectedGender: event.target.value,gender: this.state.selectedGender});
  }
  changeAIHandler = (event) => {
    this.setState(
        {apartment_id: event.target.value});
  }
  componentDidMount() {

    // step 4
    if (this.state.id === '_add') {
      this.setState({status: this.state.selectedStatus})
    } else {
      DwellerService.getDwellerById(this.state.id).then((res) => {
        let dweller = res.data;
        this.setState({
          cid: dweller.cid,
          fullname: dweller.fullname,
          email: dweller.email,
          phone: dweller.phone,
          birthday: dweller.birthday,
          gender: dweller.gender,
          apartment_id: dweller.apartment_id
        });
      });
    }
  }
  cancel() {
    this.props.router.navigate('/listDweller');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className="text-center">Add Dweller</h3>
    } else {
      return <h3 className="text-center">Update Dweller</h3>
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
                  <label> CID: </label>
                  <input placeholder="CID" name="cid"
                         className="form-control"
                         value={this.state.cid}
                         onChange={this.changeCidHandler}/>
                </div>
                <div className="form-group">
                  <label> Full name: </label>
                  <input placeholder="Full name" name="fullname"
                         className="form-control"
                         value={this.state.fullname}
                         onChange={this.changeFullnameHandler}/>
                </div>
                <div className="form-group">
                  <label> Email: </label>
                  <input type={"email"} placeholder="Email" name="email"
                         className="form-control"
                         value={this.state.email}
                         onChange={this.changeEmailHandler}/>
                </div>
                <div className="form-group">
                  <label> Phone: </label>
                  <input placeholder="Phone" name="phone"
                         className="form-control"
                         value={this.state.phone}
                         onChange={this.changePhoneHandler}/>
                </div>
                <div className="form-group">
                  <label> Birthday: </label>
                  <input placeholder="Birthday" name="birthday"
                         type={"date"}
                         className="form-control"
                         value={this.state.birthday}
                         onChange={this.changeBirthdayHandler}/>
                </div>
                <div className="form-group">
                  <label> Gender: </label>
                  <select className="form-select"
                          value={this.state.selectedGender}
                          onChange={this.changeGenderHandler}>
                    <option value="Nam">
                      Nam
                    </option>
                    <option value="Nữ">
                      Nữ
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Apratment ID: </label>
                  <input placeholder="Apratment ID" name="apartment_id"
                         className="form-control"
                         onChange={this.changeAIHandler}
                         value={this.state.apartment_id}/>
                </div>
                <br/>
                <button className="btn btn-success"
                        onClick={this.saveOrUpdateDweller}>Save
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

export default withRouter(CreateDweller)