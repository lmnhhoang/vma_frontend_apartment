import React, {Component} from 'react'
import {withRouter} from "../../helpers/withRouter";
import UserService from "../../services/UserService";

class ViewUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.router.params.id, user: {}
    }
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then(res => {
      this.setState({user: res.data});
    })
  }

  render() {
    return (<div>
          <br></br>
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center"> View User Details</h3>
            <div className="card-body">
              <div className="row">
                <div><label style={{marginRight: 10}}> User
                  Name: </label>{this.state.user.username}</div>
              </div>
              <div className="row">
                <div><label
                    style={{marginRight: 10}}> Email: </label>{this.state.user.email}
                </div>
              </div>
            </div>

          </div>
        </div>)
  }
}

export default withRouter(ViewUser)