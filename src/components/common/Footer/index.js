import React, { Component } from "react";

import ArrowPic from "./../../../assets/img/arrow.png"

import "./index.css";

export class Footer extends Component {
  UNSAFE_componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  UNSAFE_componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    var element = document.getElementById("header-bottom-menu-sticky");
    var scrollbtn = document.getElementById("scrollTopBtn");
    if (number >= 180) {
      if (window.innerWidth > 768) {
        if (typeof scrollbtn != "undefined" && scrollbtn != null)
          scrollbtn.style.display = "block";
        if (typeof element != "undefined" && element != null)
          element.classList.add("nav-fixed");
      }
    } else {
      if (window.innerWidth > 768) {
        if (typeof scrollbtn != "undefined" && scrollbtn != null)
          scrollbtn.style.display = "none";
        if (typeof element != "undefined" && element != null)
          element.classList.remove("nav-fixed");
      }
    }
  };

  //--when scrollTop button click--//
  handleScrollTop = () => {
    let scrollTop = window.scrollY;
    let i = 1;
    timer();
    function timer() {
      window.scrollTo(0, scrollTop - i);
      if (i < scrollTop) {
        setTimeout(() => {
          timer();
        }, 1);
      }
      i += 20;
    }
  };

  render() {
    return (
      <div>
        <div className="arrow-btn-main" id="scrollTopBtn">
          <button className="scroll-btn" onClick={() => this.handleScrollTop()}>
            <img src={ArrowPic} alt="arrow png" />
          </button>
        </div>
        <div className="footer-items">
          <div className="container">
            <div className="row footer-items-content">
              <div className="col-lg-2 col-md-3 col-sm-5 col-5 footer-logo-body">
                <div
                  style={{ background: `url(/images/logo.png)` }}
                  className="logo-footer-img"
                ></div>
              </div>

              <div className="col-lg-10 col-md-12">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ul className="footer-sub-items">
                      <li>About Us</li>
                      <li>Our profile</li>
                      <li>Jobs</li>
                      <li>Press</li>
                      <li>Blog</li>
                      <li>Charter</li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ul className="footer-sub-items">
                      <li>Investors</li>
                      <li>Getting Started</li>
                      <li>Risks</li>
                      <li>Earning Return</li>
                      <li>Funds</li>
                      <li>Get $1000</li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ul className="footer-sub-items">
                      <li>Funderies</li>
                      <li>Raise Money</li>
                      <li>FAQ</li>
                      <li>Legal Primer</li>
                      <li>Deals</li>
                      <li>How to Raise Money</li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <ul className="footer-sub-items">
                      <li>Say Hello</li>
                      <li>hello@wefunder.com</li>
                      <li>Twitter</li>
                      <li>Facebook</li>
                      <li>Instagram</li>
                      <li>San Fransisco</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-description">
          <div className="container">
            <div className="footer-description-content">
              <span>
                <strong>
                  wefunder.com home page is managed by Wefunder Portal LLC and
                  Wefunder Inc.
                </strong>
              </span>
              <span className="footer-italic-desc">
                Wefunder Inc. runs wefunder.com and is the parent company of
                Wefunder Adviseros LLc and Wefunder Portal LLC. Wefunder
                Adviseros is an exampt reporting adviser that advise SPVs used
                in Reg D offerings. Wefunder Portal is a funding
                portal(CRD#283503) that operates sections of wefunder.com where
                some Regulation Crowdfunding offerings are made. Wefunder, Inc.
                operates sections of wefunder.com where some Regulation D and A
                offerings are made. Wefunder, Inc is not regulated as either a
                broker-dealer or funding portal and is not a member of FINRA. by
                using wefunder.com, you accept our Terms & Privacy Policy. If
                investing, you accept our Investor Agreement. You may also view
                our Privacy Notice.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
