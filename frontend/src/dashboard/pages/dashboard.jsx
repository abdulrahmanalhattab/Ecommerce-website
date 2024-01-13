import { Component } from "react";
import "./css/dashboard.css";
import { IoPerson, IoCardOutline, IoLogoDropbox } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";
import axios from "axios";
import Info from "../../info";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      members: 0,
      products: 0,
      views: 999999,
      earning: 99999,
    };
  }

  componentDidMount() {
    axios.get(Info.path + "/dashboard").then((res) => {
      this.setState({
        members: res.data.user,
        products: res.data.product,
      });
    });
  }
  render() {
    return (
      <div className="Dashboard">
        <div className="Cards-dash">
          <div>
            <div>
              <p>Members</p>
              <p>{this.state.members}</p>
            </div>

            <IoPerson />
          </div>
          <div>
            <div>
              <p>Products</p>
              <p>{this.state.products}</p>
            </div>

            <IoLogoDropbox />
          </div>
          <div>
            <div>
              <p>Views</p>
              <p>{this.state.views}</p>
            </div>

            <BiSolidShow />
          </div>
          <div>
            <div>
              <p>Earning</p>
              <p>{this.state.earning}$</p>
            </div>

            <IoCardOutline />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
