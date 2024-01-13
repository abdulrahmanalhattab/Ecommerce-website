import { Component } from "react";
import "./css/cards.css";
import Info from "../../info";

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
    };
  }
  showSlide(index) {
    const cards = document.querySelector(".cards");
    const totalCard = document.querySelectorAll(".card").length;

    if (index >= 0 && totalCard > index) {
      cards.scrollTo({
        left: (document.querySelector(".card").clientWidth + 50) * index,
        behavior: "smooth",
      });

      this.setState({
        currentIndex: index,
      });
    } else {
      cards.scrollTo({
        behavior: "smooth",
        left: 0,
      });
      this.setState({
        currentIndex: 0,
      });
    }
  }

  nextSlide() {
    this.showSlide(this.state.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.state.currentIndex - 1);
  }
  render() {
    return (
      <div className="BestModels">
        <h2>Best the new models</h2>
        <div className="box-card">
          <div className="arrow">
            <span
              onClick={() => this.prevSlide()}
              className="material-symbols-outlined"
            >
              chevron_left
            </span>
          </div>
          <div className="cards">
            {this.props.data ? (
              this.props.data.slice(-10).map((v, i) => {
                return (
                  <div key={i + 600} className="card">
                    <div>
                      <img src={Info.path + "/img/" + v.img} alt="" />
                      <div>
                        <h2>{v.product}</h2>
                        {v.description.map((val, i) => {
                          return (
                            <p key={700 + i}>
                              - <span>{val}.</span>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="card">
                <div>
                  <img src={Info.path + "/img/uploadimg.png"} alt="" />
                  <div>
                    <h2>Title</h2>
                    <p>
                      - <span>Description.</span>
                    </p>
                    <p>
                      - <span>Description.</span>
                    </p>
                    <p>
                      - <span>Description.</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="arrow">
            <span
              onClick={() => this.nextSlide()}
              className="material-symbols-outlined"
            >
              chevron_right
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
