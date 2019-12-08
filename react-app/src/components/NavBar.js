import React from "react";
import { Link } from "react-router-dom";
import "../commom/navbar.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
function NavBar() {
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
                  <Link to="/home2/">享烘論壇</Link>
                </li>
                <li>
                  <Link to="/teacher/">玩樂烘培</Link>
                </li>
                <li>
                  <Link to="/member/">
                  <MdPerson/></Link>
                </li>
                <li>
                  <Link to="/home4/"><FaShoppingCart/></Link>
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
