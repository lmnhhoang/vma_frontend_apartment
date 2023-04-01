import React, {Component} from "react";
import UserDataService from "../../services/auth/userData.service";
import EventBus from "../../helpers/EventBus";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserDataService.getUserBoard().then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          this.setState({
            content:
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
          });

          // if (error.response && error.response.status === 401) {
          //   EventBus.dispatch("logout");
          // }
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