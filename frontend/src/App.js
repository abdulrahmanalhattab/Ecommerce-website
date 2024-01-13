import { Component } from "react";
import "./index.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import Furniture from "./pages/furniture";
import Dashboard from "./dashboard";
import Login from "./pages/login";
import axios from "axios";
import Info from "./info";

// Hattab furniture
class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: "",
      data: {},
    };
  }

  async componentDidMount() {
    axios.defaults.withCredentials = true;
    await axios
      .post(Info.path + "/user", {}, { withCredentials: true })
      .then((result) => {
        // this.setState({
        //   auth: res.headers.auth
        // })
        if (result.data.status) {
          this.setState({
            auth: result.data.data.session,
            data: result.data.data,
          });
        }
      });
  }
  render() {
    const { auth, data } = this.state;
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/furniture/:type" element={<Furniture />} />

          {auth ? (
            <>
              <Route
                path="/administrator/:path"
                element={<Dashboard data={data} />}
              />
              {/* <Route
                path="/administrator"
                element={<Navigate to={"/administrator/dashboard"} />}
              /> */}
            </>
          ) : (
            <>
              <Route
                path="/administrator"
                element={<Navigate to={"/administrator/login"} />}
              />
              <Route path="/administrator/login" element={<Login />} />
            </>
          )}

          <Route path="/*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
