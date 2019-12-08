import React from "react";
import "./scss/teacher.scss";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
function Teacher() {
  return (
    <>
      <div className="container teacher-container">
        <div>
          <div className="title">國際名師</div>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/teacher/t1.png"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/teacher/t3.png"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/teacher/t4.png"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/teacher/t5.png"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="store">
          <ul>
            <li className="store-title">六間具有特色的店家</li>
            <li>
              <ul className="d-flex flex-wrap">
                <li className="store-card">
                  <span>大安店</span>
                </li>
                <li className="store-card">
                  <span>大安店</span>
                </li>
                <li className="store-card">
                  <span>大安店</span>
                </li>
                <li className="store-card">
                  <span>大安店</span>
                </li>
                <li className="store-card">
                  <span>大安店</span>
                </li>
                <li className="store-card">
                  <span>大安店</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="teacher-main">
          <h3>挑選您的課程</h3>
          <div className="row">
            <div className="col-md-4 col-12 teacher-main-left">
              <ul>
                <li>
                  選老師:
                  <select name="YourLocation">
                    <option value="Taipei">全部</option>　
                    <option value="Taipei">1</option>　
                    <option value="Taoyuan">2</option>　
                    <option value="Hsinchu">3</option>　
                    <option value="Miaoli">4</option>
                  </select>
                </li>
                <li>
                  選店家:
                  <select name="YourLocation">
                    <option value="Taipei">全部</option>　
                    <option value="Taoyuan">大安店</option>　
                    <option value="Hsinchu">信義店</option>　
                    <option value="Miaoli">西門店</option>
                    <option value="Miaoli">士林店</option>
                    <option value="Miaoli">大直店</option>
                  </select>
                </li>
                <li>
                  課程種類:
                  <select name="YourLocation">
                    <option value="Taipei">全部</option>　
                    <option value="Taipei">蛋糕</option>　
                    <option value="Taoyuan">麵包</option>　
                    <option value="Hsinchu">小點</option>　
                    <option value="Miaoli">其他</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className="col-md-8 col-12  teacher-main-right">
              <ul className="d-flex flex-wrap">
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher;
