import { Component } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./css/products.css";
import axios from "axios";
import Info from "../../../info";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      pages: 0,
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(Info.path + "/product", { withCredentials: true })
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { data, pages } = this.state;

    return (
      <div className="productTable">
        <div>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Card</td>
                <td>Description</td>
                <td>Display</td>
                <td>Date created</td>
              </tr>
            </thead>
            <tbody>
              {data[pages] && Array.isArray(data[pages]) ? (
                data[pages].map((v, i) => (
                  <tr key={i}>
                    <td>{v.id}</td>
                    <td>
                      <div>
                        <img
                          src={Info.path+"/img/"+v.img}
                          alt=""
                        />
                      </div>
                      <p>{v.product}</p>
                    </td>
                    <td>
                      {v.description.map((item, index) => (
                        <p key={index + 100}>- {item}</p>
                      ))}
                    </td>
                    <td>{v.display}</td>
                    <td>{v.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div>
          <IoIosArrowBack
            onClick={() => {
              console.log("back");
              if (pages <= this.state.data.length - 1 && pages > 0) {
                this.setState({
                  pages: pages - 1,
                });
              }
            }}
          />
          <span>
            {" "}
            {pages + 1} - {this.state.data.length}
          </span>
          <IoIosArrowForward
            onClick={() => {
              if (pages < this.state.data.length - 1 && pages >= 0) {
                this.setState({
                  pages: pages + 1,
                });
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default Product;
