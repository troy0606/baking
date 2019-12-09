import React from "react";
import "./scss/member.scss";
import { Link, Route, Switch } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container member-container">
        <div className="row">
          <div className="col-4 member-side-bar">
            <ul>
              <li className="img-li">
                <div className="img-box">
                  <img src="/images/memberBIGHEAD.jpeg " alt="" />
                </div>
                <div className="img-edit">
                  <p>編輯</p>
                </div>
                <hr />
              </li>
              <li>
                <Link to="/member/info">個人資訊</Link>
              </li>
              <li>
                <Link to="/member/edit">修改密碼</Link>
              </li>
            </ul>
          </div>
          <div className="col-8 member-main">
            {/* 右側內容 */}
            <Switch>
              <Route exact path={"/member/info"} component={() => "info"} />
              <Route exact path={"/member/edit"} component={() => "edit"} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
