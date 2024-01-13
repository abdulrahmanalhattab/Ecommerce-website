import { Component } from "react";
import "./css/navbar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { IoSettings, IoPersonCircle } from "react-icons/io5";
import { AiFillDashboard } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import Info from "../../info";

class NavbarDashboard extends Component {
  constructor() {
    super();
    this.state = {
      IsNavbar: true,
      IsMobile: window.innerWidth <= 430,
    };
  }
  CloseMenu() {
    let navbar = document.querySelector("#navbar");
    let dashboard = document.querySelector("#dashboard > div:nth-child(2)");
    if (this.state.IsNavbar === true) {
      navbar.className = "navbar2";
      dashboard.className = "dashboard2";
      this.setState({
        IsNavbar: false,
      });
    } else {
      navbar.className = "navbar1";
      dashboard.className = "dashboard1";
      this.setState({
        IsNavbar: true,
      });
    }
  }

  TranformTo(t) {
    window.location.href = "./" + t;
  }

  CloseNavbarMobile() {
    let buttonMenu = document.querySelector(
      ".MainBar > div:nth-child(2) > div:nth-child(2)"
    );
    let navbar = document.getElementById("navbar");
    navbar.style.width = "0";
    buttonMenu.style.display = "block";
  }

  logout() {
    axios
      .post(Info.path + "/logout", {}, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          window.location.href = "../";
        }
      });
  }
  render() {
    const { IsNavbar } = this.state;
    return (
      <div id="navbar" className="navbar1">
        <div>
          <h2>HF</h2>
          <div>
            {this.state.IsMobile ? (
              <IoIosArrowBack onClick={() => this.CloseNavbarMobile()} />
            ) : IsNavbar ? (
              <IoIosArrowBack onClick={() => this.CloseMenu()} />
            ) : (
              <IoIosArrowForward onClick={() => this.CloseMenu()} />
            )}
          </div>
        </div>
        <hr />
        <ul>
          <li onClick={() => this.TranformTo("dashboard")}>
            <AiFillDashboard /> <span>Dashboard</span>
          </li>
          <li onClick={() => this.TranformTo("products")}>
            <BsFillPlusCircleFill /> <span>Products</span>
          </li>
          <li onClick={() => this.TranformTo("members")}>
            <IoPersonCircle /> <span>Members</span>
          </li>
        </ul>
        <hr />
        <ul>
          <li>
            <MdOutlinePowerSettingsNew onClick={() => this.logout()} />{" "}
            <span onClick={() => this.logout()}>logout</span>
          </li>
          <li onClick={() => this.TranformTo("settings")}>
            <IoSettings /> <span>Settings</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavbarDashboard;
