import React, { Component } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "react-modal";
import SlidingPane from "react-sliding-pane";
import 'react-sliding-pane/dist/react-sliding-pane.css';

import LogoHeader from "./../../../../assets/img/logo-header.png";

export class TopHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: false,
      isPaneOpenLeft: false,
    };
  }

  componentDidMount() {
    Modal.setAppElement(this.el);
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="header-top-body">
            <div className="top-navbar-brand">
              <Link to={"/"}>
                <img
                  src={LogoHeader}
                  className="logo_img"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="top-page-items">
              <ul className="page-nav-body">
                <li className="top-nav-item">
                  <Link to={"/assets-detail"}>Start Investing</Link>
                </li>
                <li className="top-nav-item">
                  <Link to={"/"}>Raise Capital</Link>
                </li>
                <li className="top-nav-item">
                  <Link to={"/about-us"}>About</Link>
                </li>
                <li className="top-nav-item">
                  <Link to={"/register"}>
                    <div className="top-login-btn">Login</div>
                  </Link>
                </li>
                <li className="top-nav-item">
                  <Link to={"/"}>
                    Language <i className="fa fa-angle-down"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="top-mobile-menu">
              <MenuIcon
                className="top-menu-icon"
                onClick={() => this.setState({ isPaneOpen: true })}
              />
            </div>
          </div>
        </div>

        {/* mobile view slider menu */}
        <div ref={(ref) => (this.el = ref)}>
          <SlidingPane
            className="mobile-slider-menu"
            overlayClassName="mobile-menu-overlay-class"
            isOpen={this.state.isPaneOpen}
            title="MENU"
            // subtitle="Optional subtitle."
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              this.setState({ isPaneOpen: false });
            }}
          >
            <div className="mobile-menu-items-body">
              <div className="mobile-menu-item">
                <Link to={"/assets-detail"}>Start Investing</Link>
              </div>
              <div className="mobile-menu-item">
                <Link to={"/"}>Raise Capital</Link>
              </div>
              <div className="mobile-menu-item">
                <Link to={"/about-us"}>About</Link>
              </div>
              <div className="mobile-menu-item">
                <Link to={"/visitor-register"}>Log in</Link>
              </div>
              <div className="mobile-menu-item">
                <Link to={"/"}>Language</Link>
              </div>
            </div>
          </SlidingPane>
        </div>
      </div>
    );
  }
}

export default TopHeader;
