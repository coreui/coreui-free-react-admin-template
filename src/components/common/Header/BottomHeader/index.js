import React, { Component } from "react";
import { Link } from "react-router-dom";

export class BottomHeader extends Component {
  render() {
    return (
      <div>
        <div className="header-bottom-nav-bar" id="header-bottom-menu-sticky">
          <div className="container">
            <ul className="header-bottom-items">
              <li className="header-bottom-nav-item">
                <Link to={"/"} className="header-bottom-nav-link">
                  Live Offering
                </Link>
              </li>
              <li className="header-bottom-nav-item">
                <Link to={"/"} className="header-bottom-nav-link">
                  Upcoming Offering
                </Link>
              </li>
              <li className="header-bottom-nav-item">
                <Link to={"/"} className="header-bottom-nav-link">
                  Success Funded
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BottomHeader;
