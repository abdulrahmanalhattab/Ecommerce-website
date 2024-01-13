import { Component } from "react";
import Navbar from "./Components/Navbar";
import "./css/home.css";
import Sliderbar from "./Components/Slider";
import Cards from "./Components/Cards";
import Footer from "./Components/footer";
import Contact from "./Components/contact";
import axios from "axios";
import Info from "../info";
class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    axios.get(Info.path + "/home", { withCredentials: true }).then((res) => {
      this.setState({
        data: res.data,
      });
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div className="HomePage">
        <Navbar />
        <Sliderbar data={data.product} />
        <Cards data={data.product} />
        <Contact data={data.social} />
        <Footer data={{ social: data.social, types: data.types }} />
      </div>
    );
  }
}

export default HomePage;
