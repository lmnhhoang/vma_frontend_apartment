import React, {Component} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import {NavLink} from 'react-router-dom';
import {withRouter} from "../helpers/withRouter";
import AuthService from "../services/auth/auth.service";
import EventBus from "../helpers/EventBus";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false, showAdminBoard: false, currentUser: '',
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false, showAdminBoard: false, currentUser: undefined,
    });
  }

  render() {
    const {currentUser, showModeratorBoard, showAdminBoard} = this.state;
    return (
        <div>
          {(showModeratorBoard || showAdminBoard) ? (
              <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader
                    prefix={<i className="fa fa-bars fa-large"></i>}>
                  <a href="/" className="text-decoration-none"
                     style={{color: 'inherit'}}>
                    Apartment Manage
                  </a>
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                  <CDBSidebarMenu>
                    <NavLink to="/listBuilding">
                      <CDBSidebarMenuItem
                          icon="building">Building</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/listApartment">
                      <CDBSidebarMenuItem
                          icon="box">Apartment</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/listDweller">
                      <CDBSidebarMenuItem
                          icon="universal-access">Dwellers</CDBSidebarMenuItem>
                    </NavLink>

                    <NavLink to="/listFee">
                      <CDBSidebarMenuItem icon="wallet">Fee</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/listBill">
                      <CDBSidebarMenuItem
                          icon="bookmark">Bill</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/listUser">
                      <CDBSidebarMenuItem icon="user">User</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/listManage">
                      <CDBSidebarMenuItem
                          icon="box">Monthly Detail</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/">
                      <CDBSidebarMenuItem
                          icon="wrench">Settings</CDBSidebarMenuItem>
                    </NavLink>
                  </CDBSidebarMenu>
                </CDBSidebarContent>
                <CDBSidebarFooter style={{textAlign: 'left'}}>
                  {currentUser ? (
                      <div style={{display: 'flex'}}>
                        <NavLink to="/profile" style={{
                          textDecoration: 'none',
                          color: '#ffffff'
                        }}>
                          <CDBSidebarMenuItem>User Profile</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/login" onClick={this.logOut} style={{
                          textDecoration: 'none',
                          color: '#ffffff'
                        }}>
                          <CDBSidebarMenuItem>Log Out</CDBSidebarMenuItem>
                        </NavLink>
                      </div>
                  ) : (
                      <NavLink to={"/login"}>
                        <CDBSidebarMenuItem>Login</CDBSidebarMenuItem>
                      </NavLink>
                  )}
                </CDBSidebarFooter>
              </CDBSidebar>
          ) : (
              <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader
                    prefix={<i className="fa fa-bars fa-large"></i>}>
                  <a href="/" className="text-decoration-none"
                     style={{color: 'inherit'}}>
                    Apartment Manage
                  </a>
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                  <CDBSidebarMenu>
                    <NavLink to="/listBuilding">
                      <CDBSidebarMenuItem
                          icon="building">Building</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/">
                      <CDBSidebarMenuItem
                          icon="exclamation-circle">Sales</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/">
                      <CDBSidebarMenuItem
                          icon="wrench">Settings</CDBSidebarMenuItem>
                    </NavLink>
                  </CDBSidebarMenu>
                </CDBSidebarContent>
                <CDBSidebarFooter style={{textAlign: 'left'}}>
                  {currentUser ? (
                      <div style={{display: 'flex'}}>
                        <NavLink to="/profile" style={{
                          textDecoration: 'none',
                          color: '#ffffff'
                        }}>
                          <CDBSidebarMenuItem>User Profile</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/login" onClick={this.logOut} style={{
                          textDecoration: 'none',
                          color: '#ffffff'
                        }}>
                          <CDBSidebarMenuItem>Log Out</CDBSidebarMenuItem>
                        </NavLink>
                      </div>
                  ) : (
                      <NavLink to={"/login"}>
                        <CDBSidebarMenuItem>Login</CDBSidebarMenuItem>
                      </NavLink>
                  )}
                </CDBSidebarFooter>
              </CDBSidebar>
          )}

        </div>
    )

  }
}

export default withRouter(Sidebar)