import React, {Component} from "react";

import UserDataService from "../../services/auth/userData.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserDataService.getPublicContent().then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          this.setState({
            content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
          });
        }
    );
  }

  render() {
    return (
        <div className="container">
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </div>
    );
  }
}