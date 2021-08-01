import React, { Component } from "react";
import "./Contact.css";
import { Link } from "react-router-dom";
import image_data from "../images/public_images.json";

class Contact extends Component {
  render() {
    return (
      <div id="Contact_container">
        <div
          id="Contact_content_wrap"
          className="container-fluid d-flex justify-content-center mx-auto"
        >
          <div id="Contact_left_column" className="mx-3 mx-md-5 ">
            <div id="Contact_left_image">
              <img
                src={image_data.left_image}
                alt="leftImage"
                className="img-fluid Contact_image"
              />
            </div>
            <p id="Contact_left_text">
              李筠婕
              <br />
              B06901014
            </p>
          </div>
          <div id="Contact_right_column" className="mx-3 mx-md-5 mx-lg-6">
            <div id="Contact_right_image">
              <img
                src={image_data.right_image}
                alt="rightImage"
                className="img-fluid Contact_image"
              />
            </div>
            <p id="Contact_right_text">
              鄭謹譯
              <br />
              B06901180
            </p>
          </div>
        </div>
        <div className="container d-flex justify-content-center mt-5">
          <Link id="Contact_link" to="/Team">
            <button id="Contact_team_btn" className="px-3 py-2">
              History Team
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Contact;
