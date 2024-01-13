import { Component } from "react";
import "./css/CreateProduct.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Info from "../../../info";

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      img: Info.path + "/img/uploadimg.png",
      description: [],
    };
  }

  AddDescription() {
    let val = document.querySelector(".description");

    if (this.state.description.length < 4) {
      var newDesc = [...this.state.description];
      newDesc.push(val.value);
      this.setState({
        description: newDesc,
      });
      val.value = "";
    } else {
      val.style.border = "2px solid red";
    }
  }

  DeleteDescription(v) {
    let OldVal = [...this.state.description];
    OldVal.splice(v, 1);
    this.setState({
      description: OldVal,
    });
  }

  UpdateDescription(v) {
    console.log(v);
    let OldVal = [...this.state.description];
    let InputDesc = document.querySelector(".description");
    InputDesc.value = OldVal[v];
    OldVal.splice(v, 1);
    console.log(OldVal);
    this.setState({
      description: OldVal,
    });
  }

  Sendroduct() {
    const formData = new FormData();

    const title = document.querySelector(".title").value;
    const price = document.querySelector(".price").value;
    const rate = document.querySelector(".rate").value;
    const file = document.querySelector(".UploadPhoto");
    const type = document.querySelector(".type").value;

    const data = {
      product: title,
      description: this.state.description,
      price: price,
      rate: rate,
      type: type,
    };

    formData.append("file", file.files[0]);
    for (const key in data) {
      formData.append(key, data[key]);
    }

    axios
      .post(Info.path + "/create-product", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          window.location.reload();
        } else {
          console.log("create-product: ", res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { description } = this.state;
    return (
      <div className="CreateProduct">
        <div className="CardProduct">
          <div>
            <img src={this.state.img} alt="" />

            <div
              onClick={() => {
                let fileInput = document.querySelector(".UploadPhoto");
                fileInput.click();
              }}
            >
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
                        img: e.target.result,
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
                <input className="title" type="text" placeholder="Title" />
              </div>
              <div>
                <input className="type" type="text" placeholder="Type" />
              </div>
              <div>
                <input
                  className="description"
                  type="text"
                  placeholder="Description"
                />
                <input
                  type="button"
                  value={"Add"}
                  onClick={() => this.AddDescription()}
                />
              </div>
              <div>
                {description.map((v, i) => {
                  return (
                    <p key={i + 200}>
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
                className="price"
                type="text"
                placeholder="Price"
                onChange={(e) => {
                  let inputVal = e.target;
                  if (!isNaN(inputVal.value)) {
                    inputVal.style.border = "2px solid #A1662F";
                    if (!/^[1-5][0-5]*$/.test(inputVal.value)) {
                      inputVal.value = String(parseInt(inputVal.value));
                    }
                  } else {
                    inputVal.style.border = "2px solid red";
                    inputVal.value = 0;
                  }
                }}
              />
              <input
                className="rate"
                type="text"
                placeholder="Rate out of 5"
                onChange={(e) => {
                  let inputVal = e.target;
                  if (
                    !isNaN(inputVal.value) &&
                    inputVal.value <= 5 &&
                    inputVal.value >= 0
                  ) {
                    inputVal.style.border = "2px solid #A1662F";
                    if (
                      !isNaN(inputVal.value) &&
                      inputVal.value.length !== 0 &&
                      inputVal.value.length !== 1
                    ) {
                      inputVal.value = String(parseInt(inputVal.value));
                    }
                  } else if (!isNaN(inputVal.value) && inputVal.value > 5) {
                    inputVal.value = 5;
                  } else if (!isNaN(inputVal.value) && inputVal.value < 0) {
                    inputVal.value = 0;
                  } else {
                    inputVal.value = 0;
                    inputVal.style.border = "2px solid red";
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <input
            type="button"
            value={"Create Product"}
            onClick={() => this.Sendroduct()}
          />
        </div>
      </div>
    );
  }
}

export default CreateProduct;
