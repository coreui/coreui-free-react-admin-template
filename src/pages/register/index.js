import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./index.css";

import fundSvg from "../../assets/svg/fund.svg";
import businessSvg from "../../assets/svg/business.svg";

export class index extends Component {
  render() {
    return (
      <div className="register-select-container">
        <div className="register-left-side-bar">
          <div>
            <h1>
              <strong>Few steps to create your account</strong>
            </h1>
            <h4>Start your fundraising in a minute</h4>
          </div>
        </div>
        <div className="register-items-content">
          <div>
            <div>
              <h1>
                <strong>Choose your account type</strong>
              </h1>
              <h4>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam.
              </h4>
            </div>

            <Link to={"/investor-sign-up"} className="link-style">
              <div className="register-select-item">
                <div className="register-select-item-img-body">
                  <img src={fundSvg} alt="fund png" />
                </div>
                <h5>
                  <strong>Register as Investor</strong>
                </h5>
              </div>
            </Link>

            <Link to={"/issuer-sign-up"} className="link-style">
              <div className="register-select-item">
                <div className="register-select-item-img-body">
                  <img src={businessSvg} alt="fund png" />
                </div>
                <h5>
                  <strong>Register as Issuer</strong>
                </h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
