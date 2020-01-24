import React from 'react'
import '../home/scss/home.scss'
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
                                蛋糕起源於13世紀左右。
                                最早的蛋糕是用幾樣簡單的材料做出來的，這些蛋糕是古老宗教神話與奇蹟式迷信的象徵。
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container-fulid  home-detail-2">
                    <div className="home-detail-title">關於享烘</div>
                    <div className="home-detail-content-bottom">
                        <div className="container">
                            <p>
                                生日蛋糕的由來
                                生日是靈魂最容易被惡魔入侵的日子，買個漂亮的蛋糕，享受眾人給予的祝福。
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className="container-fulid home-product" id="product">
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
        </div> */}
            </div>
        </>
    )
}

export default Home
