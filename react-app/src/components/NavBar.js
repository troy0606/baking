import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../commom/navbar.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
function NavBar() {
  const [logIn, setLogIn] = useState(false);
  useEffect(() => {}, []);
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
                  {logIn ? (
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
                    <FaShoppingCart />
                  </Link>
                  <div className="smell-cart-sidebar">
                    <ul>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                    </ul>
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
}
export default NavBar;
