import { Component } from "react";
import Navbar from "./Components/Navbar";
import "./css/login.css";
import login from "../imgs/login.svg";
import axios from "axios";
import Info from "../info";

class Login extends Component {
  checkEmail(v) {
    // /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.value))
      v.style.border = "2px solid #4d2a09";
    else v.style.border = "2px solid red";
  }

  checkPassword(v) {
    if (v.value.length > 8) v.style.border = "2px solid #4d2a09";
    else v.style.border = "2px solid red";
  }

  async SendValue() {
    let _Email = document.querySelector(".email");
    let _Password = document.querySelector(".password");

    if (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_Email.value) &&
      _Password.value.length > 8
    ) {
      axios.defaults.withCredentials = true;
      await axios
        .post(
          `${Info.path}/login`,
          { email: `${_Email.value}`, password: `${_Password.value}` },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.status) {
            window.location.href = "./dashboard";
          }
        });
    } else {
      console.log("Error");
      _Email.style.border = "2px solid red";
      _Password.style.border = "2px solid red";
    }
  }
  render() {
    return (
      <div className="login">
        <Navbar />
        <div>
          <img src={login} alt="" />
        </div>
        <div>
          <div>
            <h2>Login</h2>
            <div>
              <input
                className="email"
                type="text"
                placeholder="Email"
                onChange={(e) => this.checkEmail(e.target)}
              />
              <input
                className="password"
                type="password"
                placeholder="Password"
                onChange={(e) => this.checkPassword(e.target)}
              />
            </div>
            <div>
              <input
                type="button"
                value="Login"
                onClick={() => this.SendValue()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
