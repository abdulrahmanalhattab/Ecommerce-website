import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./css/index.css";
import NavbarDashboard from "./Components/navbar";
import MainBar from "./Components/MainBar";
import Dash from "./pages/dashboard";
import Products from "./pages/ProductPage";
import Members from "./pages/members";
import Settings from "./pages/Settings";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  render() {
    console.log(this.props);
    const { path } = this.props;
    const { data } = this.state;
    return (
      <div id="dashboard">
        <NavbarDashboard />
        <div className="dashboard1">
          <MainBar path={path} img={data.photo} />
          {path === "dashboard" ? (
            <Dash />
          ) : path === "products" ? (
            <Products />
          ) : path === "members" ? (
            <Members />
          ) : path === "settings" ? (
            <Settings data={data} />
          ) : (
            <Navigate to={"/administrator/dashboard"} />
          )}
        </div>
      </div>
    );
  }
}

function DashFun(p) {
  var { path } = useParams();

  return <Dashboard path={path} data={p.data} />;
}

export default DashFun;
