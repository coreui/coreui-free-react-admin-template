import React from "react";
import BrandCard from "./BrandCard";

const BrandList = (props) => {
  console.log(props);

  const deleteBrandHandler = (id) => {
    props.getBrandId(id);
  };
  const renderBrandList = props.brands.map((brand) => {
    return (
      <BrandCard
        brand={brand}
        clickHander={deleteBrandHandler}
        key={brand.id}
      />
    );
  });
  return <div className="ui celled list">{renderBrandList}</div>;
};

export default BrandList;
