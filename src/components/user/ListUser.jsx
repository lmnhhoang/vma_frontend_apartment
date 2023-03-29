import React, {Component} from 'react'
import {withRouter} from "../withRouter";
import UserService from "../../services/UserService";

class ListUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }


  deleteUser(id){
    UserService.deleteUser(id).then( res => {
      this.setState({users: this.state.users.filter(user => user.id !== id)});
    });
  }
  viewUser(id){
    this.props.navigate(`/viewUser/${id}`);
  }
  editUser(id){
    this.props.navigate(`/addUser/${id}`);
  }

  componentDidMount(){
    UserService.getAllUser().then((res) => {
      this.setState({ users: res.data});
    });
  }

  addUser(){
    this.props.navigate('/addUser/_add');
  }

  render() {
    return (
        <div>
          <h2 className="text-center">User List</h2>
          <div className="row">
            <button className="btn btn-primary" onClick={this.addUser}> Add
              User
            </button>
          </div>
          <br></br>
          <div className="row">
            <table className="table table-striped table-bordered">

              <thead>
              <tr>
                <th> Username</th>
                <th> Email</th>
                <th> Actions</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.users.map(
                    user =>
                        <tr key={user.user_id}>
                          <td> {user.user_name} </td>
                          <td> {user.email}</td>
                          <td>
                            <button
                                onClick={() => this.editUser(user.user_id)}
                                className="btn btn-secondary">Update
                            </button>
                            <button style={{marginLeft: "10px"}}
                                    onClick={() => this.deleteUser(
                                        user.user_id)}
                                    className="btn btn-danger">Delete
                            </button>
                            <button style={{marginLeft: "10px"}}
                                    onClick={() => this.viewUser(
                                        user.user_id)}
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
    )
  }
}

export default withRouter(ListUser)