import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../commom/navbar.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import { FaShoppingCart, FaRegTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  GetCartData_Post,
  DelCartData_Post,
  InsertOrderData
} from "../pages/cart/Actions";

import { LOGOUT_ACTION } from "../pages/member/Actions";
function NavBar() {
  const MemberLogState = useSelector(state => state.MemberLogState);
  const CartData = useSelector(state => state.CartData);
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  let cartTotal = 0;
  useEffect(() => {
    dispatch(GetCartData_Post(MemberLogState.memberSid));
    console.log(CartData);
    console.log(MemberLogState);
    //eslint-disable-next-line
  }, [MemberLogState]);
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
                    <MdPerson
                      onClick={() => {
                        setMemberOpen(!memberOpen);
                      }}
                    />
                    
                  </Link>
                  {MemberLogState.loginStatus ? (
                    <ul
                      className="member-login"
                      style={memberOpen ? {} : { display: "none" }}
                    >
                      <li>
                        <Link to="/member/">{MemberLogState.memberName}</Link>
                      </li>
                      <li>
                        <Link to="/member/">會員專區</Link>
                      </li>
                      <li
                        onClick={() =>
                          dispatch(LOGOUT_ACTION(MemberLogState.memberSid))
                        }
                      >
                        <Link to="/home/">登出</Link>
                      </li>
                    </ul>
                  ) : (
                    <ul
                      className="member-login"
                      style={memberOpen ? {} : { display: "none" }}
                    >
                      <li>
                        <Link to="/member/signup_Login">登入&註冊</Link>
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
                      {CartData.length == 0 && (
                        <li className="d-flex justify-content-center align-items-center flex-column h-100">
                          {MemberLogState.loginStatus == true
                            ? "沒有商品"
                            : "尚未登入"}
                        </li>
                      )}
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
                      <span>
                        <Link onClick={() => clearOrderData()}>
                          前往結帳頁面
                        </Link>
                      </span>
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
    let newVarray = [];
    newVarray.push(v);
    console.log(key);
    console.log(v);
    dispatch(DelCartData_Post(v.member_sid, v.cart_sid, key));
    let cart2 = CartData.filter(item => {
      return !newVarray.some(item2 => {
        console.log(item2);
        return item.cart_sid == item2.cart_sid;
      });
    });
    console.log(cart2);
    const action = InsertOrderData(cart2);
    dispatch(action);
  }
  function clearOrderData() {
    if (MemberLogState == false) {
      alert("請先登入");
      window.location.href = "http://localhost:3000/member/signup_Login";
      return;
    }
    window.location.href = "http://localhost:3000/cart/";
  }
}
export default NavBar;
