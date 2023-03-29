import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ListBuilding from "./components/building/ListBuilding";
import CreateBuilding from "./components/building/CreateBuilding";
import ViewBuilding from "./components/building/ViewBuilding";
import ListUser from "./components/user/ListUser";
import CreateUser from "./components/user/CreateUser";
import ViewUser from "./components/user/ViewUser";
import ListApartment from "./components/apartment/ListApartment";
import ViewApartment from "./components/apartment/ViewApartment";

function App() {
  return (
      <div>
        <Router>
          <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path="/" exact element={<ListBuilding/>}></Route>
              <Route path="/building" element={<ListBuilding/>}></Route>
              <Route path="/addBuilding/:id" element={<CreateBuilding/>}></Route>
              <Route path="/viewBuilding/:id" element={<ViewBuilding/>}></Route>
              <Route path="/userManage" element={<ListUser/>}></Route>
              <Route path="/addUser/:id" element={<CreateUser/>}></Route>
              <Route path="/viewUser/:id" element={<ViewUser/>}></Route>
              <Route path="/feeManage" element={<ListUser/>}></Route>
              <Route path="/addFee/:id" element={<CreateUser/>}></Route>
              <Route path="/viewFee/:id" element={<ViewUser/>}></Route>
              <Route path="/listApartment" element={<ListApartment/>}></Route>
              <Route path="/viewApartment/:id" element={<ViewApartment/>}></Route>
            </Routes>
          </div>
          <FooterComponent/>
        </Router>
      </div>
  );
}

export default App;
