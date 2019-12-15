import React from "react";
import "../navigation/scss/navigation.scss";
function Navigation() {
  return (
    <>
      <div className="navigation_container">
        <img className="bg-svg animate-svg" src="/images/assets/PIC (15).svg" />
        <img className="bg-svg animate-svg" src="/images/assets/PIC (2).svg" />
        <img className="bg-svg animate-svg" src="/images/assets/PIC (1).svg" />
        <img className="bg-svg animate-svg" src="/images/assets/PIC (19).svg" />
        <div className="cake_container">
          <div className="cake_title d-flex">
            <div className="d-flex justify-content-center">
              <h1>歡迎來到享烘</h1>
              <img src="/images/logo/handmadeIcon.png" />
            </div>
            <button className="btn">
              <a href="/home">前往享烘官網</a>
            </button>
          </div>
          <br />
          <div className="cake">
            <div className="top">
              <div className="cherry">
                <svg className="head" width="100px" viewBox="-60 -60 100 100">
                  <path d="M0 0 q 8 8 18 -4" />
                  <path d="M9 0 q -10 -40 16 -50" />
                </svg>
              </div>
            </div>
            <div className="middle">
              <div className="berry"></div>
              <div className="berry"></div>
              <div className="berry"></div>
              <div className="berry"></div>
              <div className="berry"></div>
              <div className="berry"></div>
              <div className="berry"></div>
            </div>
            <div className="bottom">
              <div className="bottom1"></div>
              <div className="bottom2"></div>
              <div className="bottom1"></div>
              <div className="bottom3"></div>
              <div className="bottom2"></div>
            </div>
            <div className="dish"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
