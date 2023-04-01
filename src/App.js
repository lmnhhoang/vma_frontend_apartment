import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ListBuilding from "./components/building/ListBuilding";
import CreateBuilding from "./components/building/CreateBuilding";
import ViewBuilding from "./components/building/ViewBuilding";
import CreateUser from "./components/user/CreateUser";
import ViewUser from "./components/user/ViewUser";
import ListApartment from "./components/apartment/ListApartment";
import ViewApartment from "./components/apartment/ViewApartment";
import CreateApartment from "./components/apartment/CreateApartment";
import UserHome from "./components/home/UserHome";
import ModHome from "./components/home/ModHome";
import AdminHome from "./components/home/AdminHome";
import Profile from "./components/auth/Profile";
import Login from "./components/auth/Login";
import Sidebar from "./components/Sidebar";
import ListDweller from "./components/dweller/ListDweller";
import CreateDweller from "./components/dweller/CreateDweller";
import ViewDweller from "./components/dweller/ViewDweller";
import ListFee from "./components/fee/ListFee";
import CreateFee from "./components/fee/CreateFee";
import ViewFee from "./components/fee/ViewFee";
import ListUser from "./components/user/ListUser";
import ListManage from "./components/aprtManage/ListManage";
import CreateManage from "./components/aprtManage/CreateManage";
import ViewManage from "./components/aprtManage/ViewManage";
import ListBill from "./components/bill/ListBill";
import CreateBill from "./components/bill/CreateBill";
import ViewBill from "./components/bill/ViewBill";

function App() {
  return (
      <div style={{
        display: 'flex',
        height: '100vh',
        overflow: 'scroll initial'
      }}>
        <Router>
          <Sidebar/>
          <div className="container" style={{marginLeft: 20, marginRight: 20}}>
            <Routes>
              {/*auth & home*/}
              <Route path="/" element={<ListBuilding/>}/>
              {/*<Route path="/home" element={<Home/>}/>*/}
              <Route path="/login" element={<Login/>}/>
              {/*<Route path="/register" element={<Register/>}/>*/}
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/userBoard" element={<UserHome/>}/>
              <Route path="/modBoard" element={<ModHome/>}/>
              <Route path="/adminBoard" element={<AdminHome/>}/>
              {/*fee*/}
              <Route path="/listFee" exact element={<ListFee/>}></Route>
              <Route path="/addFee/:id" element={<CreateFee/>}></Route>
              <Route path="/viewFee/:id" element={<ViewFee/>}></Route>
              {/*user*/}
              <Route path="/listUser" exact element={<ListUser/>}></Route>
              <Route path="/addUser/:id" element={<CreateUser/>}></Route>
              <Route path="/viewUser/:id" element={<ViewUser/>}></Route>
              {/*dweller*/}
              <Route path="/listDweller" exact element={<ListDweller/>}></Route>
              <Route path="/addDweller/:id" element={<CreateDweller/>}></Route>
              <Route path="/viewDweller/:id" element={<ViewDweller/>}></Route>
              {/*building*/}
              <Route path="/listBuilding" element={<ListBuilding/>}></Route>
              <Route path="/addBuilding/:id"
                     element={<CreateBuilding/>}></Route>
              <Route path="/viewBuilding/:id" element={<ViewBuilding/>}></Route>
              {/*apartment*/}
              <Route path="/listApartment" element={<ListApartment/>}></Route>
              <Route path="/createApartment/:id"
                     element={<CreateApartment/>}></Route>
              <Route path="/viewApartment/:id"
                     element={<ViewApartment/>}></Route>
              {/* apratment manage*/}
              <Route path="/listManage" element={<ListManage/>}></Route>
              <Route path="/createManage/:id"
                     element={<CreateManage/>}></Route>
              <Route path="/viewManage/:id"
                     element={<ViewManage/>}></Route>
              {/* bill */}
              <Route path="/listBill" element={<ListBill/>}></Route>
              <Route path="/createBill/:id"
                     element={<CreateBill/>}></Route>
              <Route path="/viewBill/:id"
                     element={<ViewBill/>}></Route>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
