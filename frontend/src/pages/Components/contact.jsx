import { Component } from "react";
import "./css/contact.css";
import { IoLogoWhatsapp, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaFacebook, FaExternalLinkAlt } from "react-icons/fa";
import instagramImg from "../../imgs/instagram.png";
import ContactPageImg from "../../imgs/ContactPage.svg";

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      facebook: false,
      instagram: false,
      whatsapp: false,
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }
  DisplayContactCard(v, t) {
    if (t === true) {
      if (v === 1 && this.state.facebook === false) {
        document.querySelector(
          ".contactCard > div:nth-child(" + v + ") > div:nth-child(2)"
        ).style.height = "80px";
        document.querySelector(
          ".contactCard > div:nth-child(" +
            v +
            ") > div:nth-child(1) > div:nth-child(3)"
        ).style.display = "none";
        this.setState({
          facebook: true,
        });
      } else if (v === 2 && this.state.instagram === false) {
        document.querySelector(
          ".contactCard > div:nth-child(" + v + ") > div:nth-child(2)"
        ).style.height = "80px";
        document.querySelector(
          ".contactCard > div:nth-child(" +
            v +
            ") > div:nth-child(1) > div:nth-child(3)"
        ).style.display = "none";
        this.setState({
          instagram: true,
        });
      } else if (v === 3 && this.state.whatsapp === false) {
        document.querySelector(
          ".contactCard > div:nth-child(" + v + ") > div:nth-child(2)"
        ).style.height = "80px";
        document.querySelector(
          ".contactCard > div:nth-child(" +
            v +
            ") > div:nth-child(1) > div:nth-child(3)"
        ).style.display = "none";
        this.setState({
          whatsapp: true,
        });
      }
    } else {
      if (v === 1 && this.state.facebook === true) {
        document.querySelector(
          ".contactCard > div:nth-child(" + v + ") > div:nth-child(2)"
        ).style.height = "0";
        document.querySelector(
          ".contactCard > div:nth-child(" +
            v +
            ") > div:nth-child(1) > div:nth-child(3)"
        ).style.display = "block";
        this.setState({
          facebook: false,
        });
      } else if (v === 2 && this.state.instagram === true) {
        document.querySelector(
          ".contactCard > div:nth-child(" + v + ") > div:nth-child(2)"
        ).style.height = "0";
        document.querySelector(
          ".contactCard > div:nth-child(" +
            v +
            ") > div:nth-child(1) > div:nth-child(3)"
        ).style.display = "block";
        this.setState({
          instagram: false,
        });
      } else if (v === 3 && this.state.whatsapp === true) {
        document.querySelector(
          ".contactCard > div:nth-child(" + v + ") > div:nth-child(2)"
        ).style.height = "0";
        document.querySelector(
          ".contactCard > div:nth-child(" +
            v +
            ") > div:nth-child(1) > div:nth-child(3)"
        ).style.display = "block";
        this.setState({
          whatsapp: false,
        });
      }
    }
  }

  render() {
    return (
      <div id="contact" className="ContactPage">
        <h2>Contact us</h2>
        <div>
          <img src={ContactPageImg} alt="" />
          <div className="contact">
            <div className="contactCard">
              <div>
                <div onClick={() => this.DisplayContactCard(1, true)}>
                  <span>
                    <FaFacebook color="#3b5998" />
                  </span>
                  <div>Facebook</div>
                  <div>
                    <IoIosArrowDown />
                  </div>
                </div>
                <div>
                  <div>
                    <span
                      onClick={() => {
                        window.location.href = this.props.data
                          ? this.props.data.facebook.url
                          : "";
                      }}
                    >
                      {this.props.data ? this.props.data.facebook.username : ""}

                      <FaExternalLinkAlt />
                    </span>
                  </div>
                  <div>
                    <span onClick={() => this.DisplayContactCard(1, false)}>
                      <IoIosArrowUp />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div onClick={() => this.DisplayContactCard(2, true)}>
                  <span>
                    <img src={instagramImg} alt="insta" />
                  </span>
                  <div>Instagram</div>
                  <div>
                    <IoIosArrowDown />
                  </div>
                </div>
                <div>
                  <div>
                    <span
                      onClick={() => {
                        window.location.href = this.props.data
                          ? this.props.data.instagram.url
                          : "";
                      }}
                    >
                      {this.props.data
                        ? this.props.data.instagram.username
                        : ""}
                      <FaExternalLinkAlt />
                    </span>
                  </div>
                  <div>
                    <span onClick={() => this.DisplayContactCard(2, false)}>
                      <IoIosArrowUp />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div onClick={() => this.DisplayContactCard(3, true)}>
                  <span>
                    <IoLogoWhatsapp color="#25d366" />
                  </span>
                  <div>Whatsapp</div>
                  <div>
                    <IoIosArrowDown />
                  </div>
                </div>
                <div>
                  <div>
                    <span
                      onClick={() => {
                        window.location.href = this.props.data
                          ? this.props.data.whatsapp.url
                          : "";
                      }}
                    >
                      {this.props.data ? this.props.data.whatsapp.username : ""}
                      <FaExternalLinkAlt />
                    </span>
                  </div>
                  <div>
                    <span onClick={() => this.DisplayContactCard(3, false)}>
                      <IoIosArrowUp />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
