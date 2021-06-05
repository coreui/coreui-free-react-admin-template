import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryList = (props) => {
  console.log(props);

  const deleteCategoryHandler = (id) => {
    props.getCategoryId(id);
  };
  const renderCategoryList = props.categorys.map((category) => {
    return (
      <CategoryCard
        category={category}
        clickHander={deleteCategoryHandler}
        key={category.id}
      />
    );
  });
  return <div className="ui celled list">{renderCategoryList}</div>;
};

export default CategoryList;
