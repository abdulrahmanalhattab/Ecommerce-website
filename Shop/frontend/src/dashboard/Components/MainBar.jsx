import { Component } from "react";
import "./css/mainbar.css";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import Info from "../../info";

class MainBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsMobile: window.innerWidth <= 430,
      data: props.data,
    };
  }

  OpenNavbar() {
    let buttonMenu = document.querySelector(
      ".MainBar > div:nth-child(2) > div:nth-child(2)"
    );
    let navbar = document.getElementById("navbar");
    navbar.style.width = "60%";
    buttonMenu.style.display = "none";
  }

  OpenMenu() {
    const menu = document.querySelector(
      ".MainBar > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
    );
    // const mainMenu = document.querySelector('.MainBar > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)')

    if (menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }

  render() {
    const { path, img } = this.props;
    return (
      <div className="MainBar">
        <div>
          <h3>{path.charAt(0).toUpperCase() + path.slice(1)}</h3>
          <p>~ administrator / {path}</p>
        </div>
        <div>
          <div>
            <div>
              <div>
                <img
                  src={
                    img
                      ? Info.path + "/img/" + img
                      : Info.path + "/img/uploadimg.png"
                  }
                  alt=""
                />
              </div>
              {/* <IoIosArrowDown /> */}
            </div>
            <div style={{ display: "none" }}>
              <ul>
                <li>Home</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            </div>
          </div>

          {this.state.IsMobile && (
            <div style={{ display: "block" }}>
              <MdOutlineMenu onClick={() => this.OpenNavbar()} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MainBar;
