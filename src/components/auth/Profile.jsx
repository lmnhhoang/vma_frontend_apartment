import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import AuthService from "../../services/auth/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {username: ""}
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({redirect: "/home"});
    }
    this.setState({currentUser: currentUser, userReady: true})
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect}/>
    }

    const {currentUser} = this.state;

    return (
        <div className="container">
          {(this.state.userReady) ?
              <div className="row">
                <header className="jumbotron">
                  <h3>
                     Profile <strong>{currentUser.username}</strong>
                  </h3>
                </header>
                <table className="table table-striped table-bordered">
                  <thead>
                  <tr>
                    <th> ID</th>
                    <th> Email</th>
                    <th> Role</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td> {currentUser.id} </td>
                    <td> {currentUser.email} </td>
                    <td>
                      <ul>
                        {currentUser.roles &&
                            currentUser.roles.map(
                                (role, index) => <li key={index}>{role}</li>)}
                      </ul>
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div> : null}
        </div>
    );
  }
}