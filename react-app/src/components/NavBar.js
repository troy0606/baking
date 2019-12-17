import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../commom/navbar.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import { FaShoppingCart, FaRegTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { GetCartData_Post, DelCartData_Post } from "../pages/cart/Actions";

function NavBar() {
  const MemberLogState = useSelector(state => state.MemberLogState);
  const CartData = useSelector(state => state.CartData);
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  let cartTotal = 0;
  useEffect(() => {
    dispatch(GetCartData_Post(1));
    console.log(CartData);
  }, []);
  return (
    <>
      <nav className="container-fulid navbar-container">
        <div className="container">
          <ul className="d-flex justify-content-between">
            <li className="logo-box">
              <img src="/images/logo/logo-03.png" width="130px" />
            </li>
            <li className="menu">
              <ul className="d-flex">
                <li>
                  <Link to="/home/">享烘首頁</Link>
                </li>
                <li>
                  <Link to="/products/">享烘滋味</Link>
                </li>
                <li>
                  <Link to="/forum/">享烘論壇</Link>
                </li>
                <li>
                  <Link to="/teacher/">玩樂烘培</Link>
                </li>
                <li className="login-pos">
                  <Link>
                    <MdPerson />
                  </Link>
                  {MemberLogState ? (
                    <ul className="member-login">
                      <li>
                        <Link to="/member/">會員專區</Link>
                      </li>
                      <li>
                        <Link to="/home/">登出</Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="member-login">
                      <li>
                        <Link to="/member/signup_Login">
                          登入
                          <br />
                          註冊
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="smell-cart">
                  <Link>
                    <FaShoppingCart onClick={() => setCartOpen(!cartOpen)} />
                  </Link>
                  <div
                    className="smell-cart-sidebar"
                    style={{ top: cartOpen == true ? "60px" : "-1000%" }}
                  >
                    <ul>
                      {CartData.length == 0 && <li className="d-flex justify-content-center align-items-center flex-column h-100">沒有商品</li>}
                      {CartData.map((v, key) => {
                        cartTotal =
                          cartTotal + v.product_quantity * v.product_price;
                        return (
                          <li
                            className="d-flex justify-content-around"
                            key={key}
                          >
                            <div className="smell-cart-left">
                              <img
                                src={`/images/products/${v.product_img_1}`}
                                alt=""
                              />
                            </div>
                            <div className="smell-cart-middle d-flex flex-column justify-content-between">
                              <span>{v.product_name}</span>
                              <span>
                                {v.product_quantity} x {v.product_price}元
                              </span>
                            </div>
                            <div
                              className="smell-cart-right"
                              onClick={() => {
                                delCartData(v, key);
                              }}
                            >
                              <FaRegTrashAlt></FaRegTrashAlt>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="smell-cart-bottom d-flex justify-content-around">
                      <span>合計：{cartTotal}元</span>
                      <span>前往結帳頁面</span>
                    </div>
                    <div
                      className="smell-cart-close"
                      onClick={() => setCartOpen(false)}
                    >
                      x
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="rwd-menu">
              <AiOutlineMenu />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
  function delCartData(v, key) {
    console.log(key);
    console.log(v);
    dispatch(DelCartData_Post(v.member_sid, v.cart_sid, key));
  }
}
export default NavBar;
