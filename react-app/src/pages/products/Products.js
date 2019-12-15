import React, { useEffect, useState } from "react";
import "./scss/products.scss";
// import { Link } from "react-router-dom";
import { GetProductData } from "./Actions";
import store from "../../redux/Store";
function Products() {
  const [storeData, setStoreData] = useState(store.getState());
  // let state = useSelector(state => ({ data: state.ProductData }));
  // console.log(state);
  const storeChange = () => {
    setStoreData(store.getState());
  };
  store.subscribe(() => storeChange());
  useEffect(() => {
    store.dispatch(GetProductData());
    storeChange();
  }, [store]);
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
            <ul className="d-flex justify-content-between">
              <li onClick={() => selectProduct(null)}>本日精選</li>
              <li onClick={() => selectProduct(1)}>經典蛋糕</li>
              <li onClick={() => selectProduct(2)}>層次千層</li>
              <li onClick={() => selectProduct(3)}>美味泡芙</li>
              <li onClick={() => selectProduct(4)}>新鮮乳捲</li>
              <li onClick={() => selectProduct(5)}>美味甜點</li>
            </ul>
            <hr></hr>
          </div>
          <div className="col-12 d-flex products-product flex-wrap ">
            {storeData.ProductData &&
              storeData.ProductData.map((items, key) => {
                return (
                  <>
                    <div key={key} className="products-card">
                      <div className="detail justify-content-around align-items-center">
                        <span>{items.product_name}</span>
                        <span>{items.product_price} ($)</span>
                      </div>
                      <div
                        className="img"
                        style={{
                          backgroundImage:
                            "url('/images/products/" +
                            items.product_img_1 +
                            "')"
                        }}
                      ></div>
                    </div>
                    <div className="product-shop d-flex">
                      <div className="product-shop-left">
                        asda
                        <img src="" alt="" />
                      </div>
                      <div className="product-shop-right d-flex flex-column">
                        <h1>123</h1>
                        <p>aa</p>
                        <div className="d-flex justify-content-center align-items-center">
                          <select name="" id="">
                            <option value="1">1個</option>
                            <option value="1">2個</option>
                          </select>
                          <span>300</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
  function selectProduct(postData) {
    store.dispatch(GetProductData(postData));
    storeChange();
  }
}

export default Products;
