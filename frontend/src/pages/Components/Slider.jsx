import { Component } from "react";
import "./css/sliders.css";
import Info from "../../info";

class Sliderbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  showSlide(index) {
    const slider = document.querySelector(".slider");
    const totalSlides = document.querySelectorAll(".slider div");

    if (index <= totalSlides.length - 1 && index >= 0) {
      const position = -index * 100 + "%";
      slider.style.transform = "translateX(" + position + ")";
      this.setState({
        currentIndex: index,
      });
    } else if (index === -1) {
      const position = -(totalSlides.length - 1) * 100 + "%";
      slider.style.transform = "translateX(" + position + ")";
      this.setState({
        currentIndex: totalSlides.length,
      });
    } else {
      slider.style.transform = "translateX(0)";
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
      <div id="slider" className="slider-container">
        <div className="slider">
          {this.props.data ? (
            this.props.data.slice(-5).map((v, i) => {
              return (
                <div key={i + 500}>
                  <img src={Info.path + "/img/" + v.img} alt="img" />
                </div>
              );
            })
          ) : (
            <div>
              <img src={Info.path + "/img/uploadimg.png"} alt="img" />
            </div>
          )}
        </div>
        <div>
          <div onClick={() => this.prevSlide(1)}>
            <span className="material-symbols-outlined">chevron_left</span>
          </div>
          <div onClick={() => this.nextSlide(1)}>
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Sliderbar;
