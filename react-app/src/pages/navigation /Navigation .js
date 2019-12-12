import React from "react";
import "../home/scss/home.scss";
function Home() {
  return (
    <>
      <div className="container-fulid  home-container">
        <div className="container-fulid home-top ">
          <div className="homePage-txt">
            <span>享烘的故事</span>
          </div>
          <div className="container d-flex">
            <div className="product-title">優惠活動</div>
            <div className="product-title">
              <a href="#product">推薦商品</a>
            </div>
            <div className="product-title">
              <a href="#about">關於享烘</a>
            </div>
          </div>
        </div>
        <div className="container-fulid  home-detail-1" id="about">
          <div className="home-detail-title">關於享烘</div>
          <div className="home-detail-content-bottom">
            <div className="container">
              <p>
                享烘的起源來自於Lorem ipsum dolor, sdsgsdfgsdgdsfgdfsgsit amet
                consectetur adipisicing elit. Ab aliquid provident
              </p>
            </div>
          </div>
        </div>
        <div className="container-fulid  home-detail-2">
          <div className="home-detail-title">關於享烘</div>
          <div className="home-detail-content-bottom">
            <div className="container">
              <p>
                享烘的起源來自於Lorem ipsum dolor, sdsgsdfgsdgdsfgdfsgsit amet
                consectetur adipisicing elit. Ab aliquid provident
              </p>
            </div>
          </div>
        </div>
        <div className="container-fulid home-product" id="product">
          <div className="container">
            <div className="Today-products">
              <h3>本日推薦</h3>
              <ul className="d-flex justify-content-center">
                <li>
                  <img src="/images/home/abstract02.jpg" />
                  <p>購物去</p>
                </li>
                <li>
                  <img src="/images/home/abstract02.jpg" />
                  <p>購物去</p>
                </li>
                <li>
                  <img src="/images/home/abstract02.jpg" />
                  <p>購物去</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
