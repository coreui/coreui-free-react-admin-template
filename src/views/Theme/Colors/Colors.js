import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { Row, Col } from "reactstrap";
import { rgbToHex } from "@coreui/coreui/dist/js/coreui-utilities";

function ThemeView() {
  const [bgColor, setBgColor] = useState("rgb(255, 255, 255)");

  const tableColor = useRef();

  useEffect(() => {
    const elem = ReactDOM.findDOMNode(tableColor.current).parentNode.firstChild;
    const color = window
      .getComputedStyle(elem)
      .getPropertyValue("background-color");
    setBgColor(color);
  }, []);

  return (
    <table ref={tableColor} className="w-100">
      <tbody>
        <tr>
          <td className="text-muted">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(bgColor)}</td>
        </tr>
        <tr>
          <td className="text-muted">RGB:</td>
          <td className="font-weight-bold">{bgColor}</td>
        </tr>
      </tbody>
    </table>
  );
}

function ThemeColor(props) {
  const { className, children } = props;

  const classes = classNames(className, "theme-color w-75 rounded mb-3");

  return (
    <Col xl="2" md="4" sm="6" xs="12" className="mb-4">
      <div className={classes} style={{ paddingTop: "75%" }} />
      {children}
      <ThemeView />
    </Col>
  );
}

function Colors() {
  return (
    <div className="animated fadeIn">
      <div className="card">
        <div className="card-header">
          <i className="icon-drop" /> Theme colors
        </div>
        <div className="card-body">
          <Row>
            <ThemeColor className="bg-primary">
              <h6>Brand Primary Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-secondary">
              <h6>Brand Secondary Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-success">
              <h6>Brand Success Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-danger">
              <h6>Brand Danger Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-warning">
              <h6>Brand Warning Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-info">
              <h6>Brand Info Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-light">
              <h6>Brand Light Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-dark">
              <h6>Brand Dark Color</h6>
            </ThemeColor>
          </Row>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <i className="icon-drop" /> Grays
        </div>
        <div className="card-body">
          <Row className="mb-3">
            <ThemeColor className="bg-gray-100">
              <h6>Gray 100 Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-gray-200">
              <h6>Gray 200 Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-gray-300">
              <h6>Gray 300 Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-gray-400">
              <h6>Gray 400 Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-gray-500">
              <h6>Gray 500 Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-gray-600">
              <h6>Gray 600 Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-gray-700">
              <h6>Gray 700 Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-gray-800">
              <h6>Gray 800 Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-gray-900">
              <h6>Gray 900 Color</h6>
            </ThemeColor>
          </Row>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <i className="icon-drop" /> Additional colors
        </div>
        <div className="card-body">
          <Row>
            <ThemeColor className="bg-blue">
              <h6>Blue Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-light-blue">
              <h6>Light Blue Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-indigo">
              <h6>Indigo Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-purple">
              <h6>Purple Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-pink">
              <h6>Pink Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-red">
              <h6>Red Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-orange">
              <h6>Orange Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-yellow">
              <h6>Yellow Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-green">
              <h6>Green Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-teal">
              <h6>Teal Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-cyan">
              <h6>Cyan Color</h6>
            </ThemeColor>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Colors;
