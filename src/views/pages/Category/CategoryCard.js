import React from "react";
import { Link } from "react-router-dom";
import user from "../../../images/user.png";

const CategoryCard = (props) => {
  const { id, name,img } = props.category;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
          <div className="header">{name}</div>
          <img className="ui  image" src={img} alt="user" />
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander(id)}
      ></i>
      <Link to={{ pathname: `/edit_category`,props}}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default CategoryCard;