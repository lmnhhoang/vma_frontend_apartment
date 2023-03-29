import React, {Component} from 'react'
import {Link} from "react-router-dom";

class HeaderComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
        <div>
          <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
              <a href="/" className="navbar-brand">
                Apartment Management
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/feeManage"} className="nav-link">
                    Extra Fee Manage
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/userManage"} className="nav-link">
                    User Manage
                  </Link>
                </li>
              </div>
            </nav>
          </header>
        </div>
    )
  }
}

export default HeaderComponent