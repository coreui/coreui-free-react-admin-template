import React from "react";
import { Link } from "react-router-dom";
import user from "../../../images/user.jpg";

const BrandDetail = (props) => {
  const { name, email } = props.location.state.brand;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to brand List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BrandDetail;