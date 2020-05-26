import React, { Component } from "react";

import RectanglePic from "./../../assets/img/Rectangle 21.png";
import HandsPic from "./../../assets/img/Polygon-hands.png";
import RocketPic from "./../../assets/img/Polygon-rocket.png";
import PartnerPic from "./../../assets/img/Polygon-partner.png";

import "./index.css";

export class AboutUsContent extends Component {
  render() {
    return (
      <div>
        <div className="aboutUs-content">
          <div className="">
            <img
              src={RectanglePic}
              alt="Rectangle 21"
              className="about-img"
            />
          </div>

          <div className="container">
            <div className="overview ">
              <h1>
                <span></span>&nbsp;What we do?
              </h1>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet,
                </p>
              </div>

              <div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet,
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr
                </p>
              </div>
            </div>

            <div className="row description">
              <div className="col-md-4 team_grid text-center">
                <img
                  src={HandsPic}
                  alt=" "
                  className="img-fluid"
                />
                <h3>Description</h3>
                <p className="team_gridp">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam.
                </p>
              </div>
              <div className="col-md-4 team_grid text-center">
                <img
                  src={RocketPic}
                  alt=" "
                  className="img-fluid"
                />
                <h3>Description</h3>
                <p className="team_gridp">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam.
                </p>
              </div>
              <div className="col-md-4 team_grid text-center">
                <img
                  src={PartnerPic}
                  alt=" "
                  className="img-fluid"
                />
                <h3>Description</h3>
                <p className="team_gridp">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUsContent;
