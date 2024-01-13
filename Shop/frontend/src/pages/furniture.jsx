import { Component } from "react";
import "./css/furniture.css";
import Navbar from "./Components/Navbar";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import instagram from "../imgs/instagram.png";
import img from "../imgs/img-1.jpg";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
// import Footer from "./Components/footer";
import axios from "axios";
import Info from "../info";
import { useParams } from "react-router-dom";
import React from "react";

class Furniture extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      type: [],
      social: {},
    };
  }
  TranfromTo(val) {
    window.location.href = val;
  }

  componentDidMount() {
    axios
      .get(
        Info.path +
          (this.props?.type
            ? "/furniture?type=" + this.props.type
            : "/furniture"),
        { withCredentials: true }
      )
      .then((res) => {
        this.setState({
          data: res.data.data,
          type: res.data.type,
          social: res.data.social,
        });
      });
  }

  render() {
    return (
      <>
        <div className="Furniture">
          <Navbar />
          <div>
            <div>
              <div>
                <h2>Furniture</h2>
                <div>
                  <ul>
                    <li onClick={() => this.TranfromTo("/furniture")}>
                      Furniture
                    </li>
                    {this.state.type.map((v, i) => {
                      return (
                        <li
                          key={i + 200}
                          onClick={() => this.TranfromTo(`/furniture/${v}`)}
                        >
                          {v.charAt(0).toUpperCase() + v.slice(1)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <div
                    onClick={() => {
                      window.location.href = this.state.social.facebook.url;
                    }}
                  >
                    <FaFacebook color="#3b5998" />
                  </div>
                  <div
                    onClick={() => {
                      window.location.href = this.state.social.instagram.url;
                    }}
                  >
                    <img src={instagram} alt="" />
                  </div>
                  <div
                    onClick={() => {
                      window.location.href = this.state.social.whatsapp.url;
                    }}
                  >
                    <IoLogoWhatsapp color="#25d366" />
                  </div>
                </div>
                <div>Copyright © 2023 Abdulrahman .H.</div>
              </div>
            </div>
            <div>
              <div>
                <h2>
                  {this.props.type
                    ? this.props.type.charAt(0).toUpperCase() +
                      this.props.type.slice(1)
                    : "Furniture"}
                </h2>
                <span>
                  {this.props.type
                    ? "/ Furniture /" + this.props.type
                    : "/ Furniture"}{" "}
                </span>
              </div>

              <div>
                {this.state.data.map((v, i) => {
                  return (
                    <div key={i + 500} className="furniture-card">
                      <img src={Info.path + "/img/" + v.img} alt="" />
                      <div>
                        <div>
                          {v.description.map((val, ind) => {
                            return <p key={ind + 1000}>- {val}.</p>;
                          })}
                        </div>
                        <div>
                          <div>{v.price}$</div>
                          <div>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                            <FaRegStar />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function _Furniture() {
  const { type } = useParams();
  return <Furniture type={type} />;
}

export default _Furniture;
