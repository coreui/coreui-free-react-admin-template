import React, { Component } from "react";
import HorizontalBar from "./HorizontalBar";
export class Product extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="product-one">
        <div className="product-one-content">
          <div
            style={{ background: `url(${data.url})` }}
            className="product-image-div"
          ></div>
          <div className="product-description">
            <h4>{data.title}</h4>
            <p>{data.description}</p>
            <p className="product-store">{data.store}</p>
            <HorizontalBar percent={data.percent} />
            <div className="product-price-body">
              <div className="product-total-raise">
                <p>Total Raise</p>
                <h5>${data.total_raise}</h5>
              </div>
              <div className="product-min-invest">
                <p>Min Invest</p>
                <h5>${data.min_invest}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
