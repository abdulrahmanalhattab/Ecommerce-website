import { Component } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./css/DeleteOrUpdate.css";
import axios from "axios";
import Info from "../../../info";

class DeleteOrUpdate extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        title: "",
        description: [],
        price: "",
        rate: "",
        img: "",
      },
    };
  }
  SearchProduct() {
    const id = document.querySelector(".idProduct").value;
    const searchButton = document.querySelector(
      ".DeleteOrUpdate > div:nth-child(1)"
    );

    axios
      .post(
        Info.path + "/search-product",
        { id: id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          searchButton.style.display = "none";
          document.querySelector(
            ".DeleteOrUpdate > div:nth-child(2)"
          ).style.display = "block";
          this.setState({
            data: {
              ...res.data.data,
              img: Info.path + "/img/" + res.data.data.img,
            },
          });
        } else {
          document.querySelector(
            ".DeleteOrUpdate > div:nth-child(1) > div:nth-child(1) > input"
          ).style.border = "2px solid red";
        }
      });
  }
  AddDescription() {
    let val = document.querySelector(".description");

    if (this.state.data.description.length < 4) {
      var newDesc = [...this.state.data.description];
      newDesc.push(val.value);
      this.setState({
        data: {
          ...this.state.data,
          description: newDesc,
        },
      });
      val.value = "";
    } else {
      val.style.border = "2px solid red";
    }
  }
  DeleteDescription(v) {
    let OldVal = [...this.state.data.description];
    OldVal.splice(v, 1);

    this.setState({
      data: { ...this.state.data, description: OldVal },
    });
  }

  UpdateDescription(v) {
    console.log(v);
    let OldVal = [...this.state.data.description];
    let InputDesc = document.querySelector(".description");
    InputDesc.value = OldVal[v];
    OldVal.splice(v, 1);
    console.log(OldVal);
    this.setState({
      data: {
        ...this.state.data,
        description: OldVal,
      },
    });
  }

  CancelProduct() {
    const inputID = document.querySelector(
      ".DeleteOrUpdate > div:nth-child(1) > div:nth-child(1) > input"
    );
    inputID.style.border = "2px solid #A1662F";
    inputID.value = "";
    document.querySelector(".DeleteOrUpdate > div:nth-child(2)").style.display =
      "none";
    document.querySelector(".DeleteOrUpdate > div:nth-child(1)").style.display =
      "flex";
  }

  UpdateProduct() {
    const formData = new FormData();
    const title = document.querySelector(".title").value;
    const price = document.querySelector(".price").value;
    const rate = document.querySelector(".rate").value;
    const file = document.querySelector(".UploadPhoto");
    const desc = this.state.data.description;
    const type = document.querySelector(".type").value;
    const id = this.state.data.id;
    const data = {
      product: title,
      price: price,
      rate: rate,
      description: desc,
      id: id,
      type: type,
    };

    formData.append("file", file.files[0]);
    for (const key in data) {
      formData.append(key, data[key]);
    }

    axios
      .post(Info.path + "/update-product", formData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          window.location.reload();
        }
      });
  }

  DeleteProduct() {
    axios
      .post(
        Info.path + "/delete-product",
        { id: this.state.data.id },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status) {
          window.location.reload();
        }
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="DeleteOrUpdate">
        <div>
          <div>
            <span>ID Number </span>
            <input className="idProduct" type="text" placeholder="ID" />
          </div>
          <div>
            <input
              type="button"
              value={"Search Product"}
              onClick={() => this.SearchProduct()}
            />
          </div>
        </div>

        <div>
          <div className="CardDeleteOrUpdate">
            <div
              onClick={() => {
                let fileInput = document.querySelector(".UploadPhoto");
                fileInput.click();
              }}
            >
              <img src={this.state.data.img} alt="" />
              <div>
                <input
                  type="file"
                  style={{ display: "none" }}
                  className="UploadPhoto"
                  onChange={(e) => {
                    var file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        this.setState({
                          data: { ...this.state.data, img: e.target.result },
                        });
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <p>Upload Photo</p>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    defaultValue={this.state.data.product}
                    className="title"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Type"
                    defaultValue={this.state.data.type}
                    className="type"
                  />
                </div>
                <div>
                  <input
                    className="description"
                    type="text"
                    placeholder="Descriptopn"
                  />
                  <input
                    type="button"
                    value={"Add"}
                    onClick={() => this.AddDescription()}
                  />
                </div>
                <div>
                  {this.state.data.description.map((v, i) => {
                    return (
                      <p key={i + 300}>
                        - {v}{" "}
                        <span>
                          <MdDeleteForever
                            onClick={() => this.DeleteDescription(i)}
                          />{" "}
                          <FaEdit onClick={() => this.UpdateDescription(i)} />
                        </span>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Price"
                  defaultValue={String(this.state.data.price)}
                  className="price"
                />
                <input
                  type="text"
                  placeholder="Rate out of 5"
                  defaultValue={String(this.state.data.rate)}
                  className="rate"
                />
              </div>
            </div>
          </div>

          <div>
            <input
              type="button"
              value={"Update Product"}
              onClick={() => this.UpdateProduct()}
            />
            <input
              type="button"
              value={"Delete Product"}
              onClick={() => this.DeleteProduct()}
            />
            <input
              type="buttin"
              value={"Cancel"}
              onClick={() => this.CancelProduct()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteOrUpdate;
