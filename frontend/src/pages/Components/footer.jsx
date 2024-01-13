import { Component } from "react";
import { RiInstagramFill } from "react-icons/ri";
import { IoLocation } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhoneAlt, FaFacebook } from "react-icons/fa";
import "./css/footer.css";
import Info from "../../info";

class Footer extends Component {
  render() {
    return (
      <div id="footer" className="footer">
        <div className="footer-list">
          <div>
            <p>Furnitures</p>
            <ul>
              {this.props.data?.types
                ? this.props.data.types.slice(0, 4).map((v, i) => {
                    return (
                      <li
                        key={i + 800}
                        onClick={() => {
                          window.location.href = Info.path2 + "/furniture/" + v;
                        }}
                      >
                        - <span>{v}</span>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>

        <div className="footer-list">
          <div>
            <p>Follow us</p>
            <ul>
              <li
                onClick={() => {
                  window.location.href = this.props.data?.social
                    ? this.props.data.social.instagram.url
                    : "";
                }}
              >
                {" "}
                <RiInstagramFill /> <span> Instagram</span>
              </li>
              <li
                onClick={() => {
                  window.location.href = this.props.data?.social
                    ? this.props.data.social.facebook.url
                    : "";
                }}
              >
                {" "}
                <FaFacebook /> <span> Facebook</span>
              </li>
              <li
                onClick={() => {
                  window.location.href = this.props.data?.social
                    ? this.props.data.social.whatsapp.url
                    : "";
                }}
              >
                {" "}
                <IoLogoWhatsapp /> <span> Whatsapp</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-list">
          <div>
            <p>Address</p>
            <ul>
              <li>
                {" "}
                <IoLocation /> <span> Palestine, Nablus, Street Ftayer</span>
              </li>
              <li>
                {" "}
                <FaPhoneAlt /> <span> +970 595593325</span>
              </li>
            </ul>
          </div>
        </div>

        <span className="copyright">Copyright © 2023 Abdulrahman Hattab.</span>

        <div className="footer-list">
          <div>
            <p>About</p>
            <span>
              The exhibition offers you home furniture services, modern models
              and excellent quality. We also work on customizing the furniture
              that the customer requests according to his desire.{" "}
            </span>
          </div>
        </div>

        <span id="copyright">Copyright © 2023 Abdulrahman Hattab.</span>
      </div>
    );
  }
}

export default Footer;
