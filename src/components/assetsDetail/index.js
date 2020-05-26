import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import Slider from "react-slick";
import LanguageIcon from "@material-ui/icons/Language";
import RoomIcon from "@material-ui/icons/Room";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import Video from './../../assets/video/1.mp4';
import PlayCircle from './../../assets/img/play-circle.png';

import "./index.css";

export class AssetsDetailContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPlayState: true,
    };
  }

  componentDidMount() {
    var vid = document.getElementById("assetsVideo");
    vid.onended = () => {
      this.setState({ videoPlayState: true });
    };
  }

  handleVideoPlay = () => {
    var vid = document.getElementById("assetsVideo");
    this.setState({ videoPlayState: false });
    vid.play();
  };
  handleVideoPause = () => {
    var vid = document.getElementById("assetsVideo");
    this.setState({ videoPlayState: true });
    vid.pause();
  };
  render() {
    var settings = {
      dots: false,
      fade: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      cssEase: "linear",
      arrows: false,
    };

    return (
      <div className="container pb-5 pt-5">
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="video-container">
              <video
                className="video"
                id="assetsVideo"
                onClick={() => this.handleVideoPause()}
              >
                <source src={Video} type="video/mp4" />
              </video>

              {this.state.videoPlayState && (
                <div className="media-play-main">
                  <div
                    className="media-play-body"
                    onClick={() => this.handleVideoPlay()}
                  >
                    <img src={PlayCircle} alt="media play png" />
                  </div>
                </div>
              )}
            </div>
            <div className="row video-bottom-description">
              <div className="col-lg-5 col-md-6 d-flex align-items-center">
                <LanguageIcon className="lightred" />
                <span className="pr-2 pl-1">Website:</span>
                <span className="lightred">redcapitalinvestment.com</span>
              </div>
              <div className="col-lg-4 col-md-6 d-flex align-items-center">
                <RoomIcon className="lightred" />
                <span className="pr-2 pl-1">Address:</span>
                <span className="lightred">New York Avenu</span>
              </div>
              <div className="col-lg-3 col-md-12 d-flex align-items-center">
                <i className="fa fa-facebook-f lightred pr-4 pl-2" />
                <i className="fa fa-twitter lightred pr-4" />
                <i className="fa fa-pinterest-p lightred pr-4" />
                <i className="fa fa-linkedin lightred" />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 d-flex">
            <div className="assets-price-main">
              <div className="assets-price-body">
                <h3>$200000.00</h3>
                <strong className="lightred">Total Raise Goal</strong>
              </div>
              <div className="assets-price-body">
                <h3>$2.00</h3>
                <p className="gray-color mb-0">Price Per Unit</p>
              </div>
              <div className="assets-price-body">
                <h3>$1000.00</h3>
                <p className="gray-color mb-0">Minimum Invsetment</p>
              </div>
              <div className="assets-coming-soon-main">
                <input
                  type="button"
                  className="round-lightred-btn"
                  value="Coming Soon"
                />
                <p className="pt-3 text-center gray-color">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-5">
          <h5 className="line-heigh-5 text-justify">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr.
          </h5>
        </div>
        <div className="pb-5">
          <h2 className="d-flex align-items-center dark-blue">
            <span className="red-border-left-bg"></span>
            <strong>Why Invest Us?</strong>
          </h2>
          <h6 className="line-heigh-5 gray-color text-justify">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet,
          </h6>
        </div>
        <div>
          <h3 className="d-flex align-items-center dark-blue">
            <span className="red-border-left-sm"></span>
            <strong>Description</strong>
          </h3>
          <p className="gray-color text-justify">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
          </p>
          <br />
          <p className="gray-color text-justify">
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet.
          </p>
          <br />
          <p className="gray-color text-justify">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div className="mb-5">
          <h3 className="d-flex align-items-center pt-5 pb-1 dark-blue">
            <span className="red-border-left-sm"></span>
            <strong>Pitch Deck</strong>
          </h3>

          <div>
            <Slider
              ref={(c) => (this.slider = c)}
              className="slide-1 home-slider"
              {...settings}
            >
              <div>
                <div
                  style={{ backgroundImage: "url('./images/slider-1.png')" }}
                  className="slider-img-body"
                ></div>
              </div>
              <div>
                <div
                  style={{ background: "url('./images/slider-2.jpg')" }}
                  className="slider-img-body"
                ></div>
              </div>
              <div>
                <div
                  style={{ background: "url('./images/slider-3.jpg')" }}
                  className="slider-img-body"
                ></div>
              </div>{" "}
              <div>
                <div
                  style={{ background: "url('./images/slider-4.jpg')" }}
                  className="slider-img-body"
                ></div>
              </div>{" "}
              <div>
                <div
                  style={{ background: "url('./images/slider-5.jpg')" }}
                  className="slider-img-body"
                ></div>
              </div>
            </Slider>
          </div>

          <div className="pt-3 pb-3 d-flex nav-download-btn-main">
            <div>
              <button
                className="navigate-btn"
                onClick={() => this.slider.slickPrev()}
              >
                <NavigateBeforeIcon className="lightred" />
              </button>
              <button
                className="navigate-btn ml-3"
                onClick={() => this.slider.slickNext()}
              >
                <NavigateNextIcon className="lightred" />
              </button>
            </div>
            <div>
              <button className="round-lightred-btn-sm">
                Download &nbsp;
                <i className="fa fa-download" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="d-flex align-items-center dark-blue">
            <span className="red-border-left-sm"></span>
            <strong>Risks & Disclosers</strong>
          </h3>
          <div>
            <h6 className="pt-3 dark-blue">
              <strong>Risks:</strong>
            </h6>
            <p className="gray-color text-justify">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>

            <h6 className="pt-3 dark-blue">
              <strong>Disclosers:</strong>
            </h6>
            <p className="pb-5 gray-color text-justify">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
            <div className="pt-5 pb-5 mb-5">
              <p className="gray-color text-justify">
                <strong className="dark-blue">Disclaimer:</strong> Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssetsDetailContent;
