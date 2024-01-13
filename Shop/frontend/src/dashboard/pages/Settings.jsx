import { Component } from "react";
import "./css/settings.css";
import img1 from "../../imgs/img-1.jpg";
import axios from "axios";
import Info from "../../info";
class Settings extends Component {
  constructor() {
    super();
    this.state = {
      imgProfile: Info.path + "/img/Y24FsDhuxdnFQtAcNba.png",
    };
  }
  UploadFile() {
    const file = document.querySelector(".UploadPhoto");
    const formData = new FormData();
    formData.append("file", file.files[0]);
    axios
      .post(Info.path + "/profile", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  render() {
    const { imgProfile } = this.state;
    return (
      <div className="Settings">
        <div>
          <div className="profile">
            <div
              onClick={() => {
                let fileInput = document.querySelector(".UploadPhoto");
                fileInput.click();
              }}
            >
              <div>
                <img src={imgProfile} alt="" className="ImgProfile" />
              </div>
              <div>
                <p>Upload Photo</p>
                <input
                  type="file"
                  style={{ display: "none" }}
                  className="UploadPhoto"
                  onChange={(e) => {
                    var file = e.target.files[0];
                    let TypeFile = file.name.split(".");
                    TypeFile = TypeFile[TypeFile.length - 1];

                    if (file) {
                      if (
                        TypeFile === "png" ||
                        TypeFile === "jpg" ||
                        TypeFile === "jpeg"
                      ) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          this.setState({
                            imgProfile: e.target.result,
                          });
                        };
                        reader.readAsDataURL(file);

                        this.UploadFile();
                      } else {
                        console.log({
                          msg: "Error in uploaded file, Must be png, jpg, jpeg",
                        });
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <p>Username</p>
                <input
                  placeholder="Username"
                  type="text"
                  value={"Abdulrahman Al-Hattab"}
                  disabled
                />
              </div>
              <div>
                <p>Email</p>
                <input
                  placeholder="Email"
                  type="text"
                  value={"abdulrahman@gmail.com"}
                  disabled
                />
              </div>
            </div>
            <div>
              <input
                type="button"
                value="Edit"
              />
            </div>
          </div>
          <div className="resetPassword">
            <p>Reset your password</p>
            <div>
              <input type="button" value={"Reset Password"} />
            </div>
          </div>
        </div>
        <div>
          <div className="setLang">
            <p>Choose your languages</p>
            <div>
              <select>
                <option value="choose">Choose your languages</option>
                <option value="ar">Arabic</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
