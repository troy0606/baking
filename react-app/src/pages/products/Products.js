import React from "react";
import "./scss/products.scss";
import { Link } from "react-router-dom";
function Products() {
  return (
    <>
      <div className="container products-container">
        <div className="row">
          <div className="col-12 products-top"></div>
        </div>
        <div className="row">
          <div className=" products-coupon d-flex align-items-center">
            <div className="products-coupon-detail-1">限時優惠</div>
            <div className="products-coupon-detail-2">限時優惠</div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 products-select">
            <ul className="d-flex justify-content-around">
              <li>本日精選</li>
              <li>蛋糕</li>
              <li>麵包</li>
              <li>餅乾</li>
              <li>甜點</li>
              <li>其他</li>
            </ul>
            <hr></hr>
          </div>
          <div className="col-12 d-flex products-product">
            <div className="products-card"></div>
            <div className="products-card"></div>
            <div className="products-card"></div>
          </div>
          <div className="col-12 d-flex products-product">
            <div className="products-card"></div>
            <div className="products-card"></div>
            <div className="products-card"></div>
          </div>
          <div className="col-12 d-flex products-product">
            <div className="products-card"></div>
            <div className="products-card"></div>
            <div className="products-card"></div>
          </div>
          <div className="col-12 d-flex products-product">
            <div className="products-card"></div>
            <div className="products-card"></div>
            <div className="products-card"></div>
          </div>
          <div className="col-12 d-flex products-product">
            <div className="products-card"></div>
            <div className="products-card"></div>
            <div className="products-card"></div>
          </div>
          <div className="col-12 d-flex products-product">
            <div className="products-card"></div>
            <div className="products-card"></div>
            <div className="products-card"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
