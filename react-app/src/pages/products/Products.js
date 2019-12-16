import React, { useEffect, useState } from "react";
import "./scss/products.scss";
// import { Link } from "react-router-dom";
import { GetProductData } from "./Actions";
import store from "../../redux/Store";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

function Products() {
  const [storeData, setStoreData] = useState(store.getState());
  const [openShop, setOpenShop] = useState(null);
  const [count, setCount] = useState(1);
  const [memberSid, setMemberSid] = useState(1);
  console.log(openShop);
  const storeChange = () => {
    setStoreData(store.getState());
  };
  store.subscribe(() => storeChange());
  useEffect(() => {
    store.dispatch(GetProductData());
    storeChange();
  }, []);
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
              <li onClick={() => selectProduct(null)}>全部商品</li>
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
                    <div
                      key={key}
                      className="products-card"
                      onClick={() => openShop == null && setOpenShop(key)}
                    >
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
                    <div
                      className="product-shop"
                      style={{ display: openShop == key && "flex" }}
                    >
                      <div
                        className="close"
                        onClick={() => {
                          setOpenShop(null);
                          setCount(1);
                        }}
                      >
                        <div></div>
                        <div></div>
                      </div>
                      <div className="product-shop-left d-flex justify-content-center">
                        <img
                          src={`/images/products/${items.product_img_1}`}
                          alt=""
                        />
                      </div>
                      <div className="product-shop-right d-flex flex-column">
                        <h1>木木甜心</h1>
                        <p>
                          好吃又好玩 天氣真好 好吃又好玩 天氣真好 好吃又好玩
                          天氣真好 好吃又好玩 天氣真好
                        </p>
                        <div className="d-flex align-items-center justify-content-around w-100  p-3">
                          <div className="d-flex align-items-center">
                            <span>數量：</span>
                            <select
                              name=""
                              id=""
                              onChange={e => setCount(e.target.value)}
                            >
                              <option value="1">1個</option>
                              <option value="2">2個</option>
                            </select>
                          </div>
                          <span>總價：{items.product_price * count}</span>
                        </div>
                        <div className="d-flex justify-content-around pb-3 align-items-center">
                          <span className="cart">
                            +購物車:
                            <FaShoppingCart
                              style={{ fontSize: "24px" }}
                              onClick={() =>
                                cartPost(
                                  count,
                                  items.product_price * count,
                                  items.product_sid
                                )
                              }
                            />
                          </span>
                          <span className="love">
                            +收藏:
                            <FaHeart style={{ fontSize: "24px" }} />
                          </span>
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
  function cartPost(count, priceCount, product_sid) {
    console.log(count);
    console.log(priceCount);
    console.log(product_sid);
  }
}

export default Products;
