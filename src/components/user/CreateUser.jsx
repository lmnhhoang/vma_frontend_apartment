import React, {Component} from 'react'
import UserService from "../../services/UserService";
import {withRouter} from "../../helpers/withRouter";

class CreateUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // step 2
      id: this.props.router.params.id,
      username: '',
      email: '',
      password: '',
      roles: [],
      selectedRole: 'user'
    }
    this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeRoleHandler = this.changeRoleHandler.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  // step 3
  componentDidMount() {

    // step 4
    if (this.state.id === '_add') {
      this.setState({roles: this.state.selectedRole})
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        console.log(user);
        this.setState({
          username: user.username, email: user.email, password: user.password
        });
      });
    }
  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      roles: this.state.id === '_add' ? ["user"] : this.state.roles
    };
    console.log('user => ' + JSON.stringify(user));

    // step 5
    if (this.state.id === '_add') {
      UserService.createUser(user).then(res => {
        this.props.history.push('/listUser');
      });
    } else {
      UserService.updateUser(user, this.state.id).then(res => {
        this.props.history.push('/listUser');
      });
    }
  }
  changeRoleHandler = (event) => {
    this.setState(
        {roles: event.target.value});
  }
  changeUserNameHandler = (event) => {
    this.setState({username: event.target.value});
  }

  changePasswordHandler = (event) => {
    this.setState({email: event.target.value});
  }

  changeEmailHandler = (event) => {
    this.setState({password: event.target.value});
  }

  cancel() {
    this.props.router.navigate('/listUser');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className="text-center">Add User</h3>
    } else {
      return <h3 className="text-center">Update User</h3>
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
                  <label> User Name: </label>
                  <input placeholder="User Name" name="userName"
                         className="form-control"
                         value={this.state.username}
                         onChange={this.changeUserNameHandler}/>
                </div>
                <div className="form-group">
                  <label> Email: </label>
                  <input placeholder="Last Name" name="lastName"
                         className="form-control"
                         value={this.state.email}
                         onChange={this.changeEmailHandler}/>
                </div>
                <div className="form-group">
                  <label> Password: </label>
                  <input placeholder="Password" name="password"
                         className="form-control"
                         value={this.state.password}
                         onChange={this.changePasswordHandler}/>
                </div>
                {this.state.id !== '_add' ? (
                    <div>
                      <div className="form-group">
                        <label> Roles: </label>
                        <select className="form-select"
                                value={this.state.selectedRole}
                                onChange={this.changeRoleHandler}>
                          <option value="mod">
                            Mod
                          </option>
                          <option value="user">
                            User
                          </option>
                        </select>
                      </div>
                      <br/>
                    </div>
                ) : (<br/>)}
                <button className="btn btn-success"
                        onClick={this.saveOrUpdateUser}>Save
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

export default withRouter(CreateUser)