import React, { Component } from "react";

import TopHeader from "./TopHeader";
import BottomHeader from "./BottomHeader";

import "./index.css";

export class index extends Component {
  render() {
    return (
      <div className="heder_section">
        <TopHeader />
        <BottomHeader />
      </div>
    );
  }
}

export default index;
