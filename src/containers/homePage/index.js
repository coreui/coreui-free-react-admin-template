import React, { Component } from "react";
import Product from "./product";
// TODO change to dynamic data
import productData from "./product/product.json";
import "./index.css";

export class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.setState({ products: productData });
  }

  ProductList() {
    if (this.state.products) {
      return this.state.products.map((product, i) => {
        return <Product key={i} data={product}></Product>;
      });
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="home-content">
          <div className="content-header">
            <h1>Live offering</h1>
            <p className="product-header-description">
              Lorem ipsum dolor sit amet, consetetur sadipscing eliter, sed diam
              nonunmy eimod tempori invident ut labore et dolore magna aliquyam
              erat., sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </p>
          </div>
          <div className="product-body">{this.ProductList()}</div>
        </div>
      </div>
    );
  }
}

export default HomeContent;
