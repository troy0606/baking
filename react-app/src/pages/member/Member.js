import React, { useEffect, useState } from "react";
import "./scss/member.scss";
import { Link, Route, Switch } from "react-router-dom";
import MemberInfo from "./MemberInfo";
import MemberEdit from "./MemberEdit";
import axios from "axios";

function Home() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/member/checklogin", {
        withCredentials: true
      })
      .then(result => {
        if (result.data.status !== "202") {
          alert("請先登入");
          window.history.go(-1);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Route
                exact
                path={"/member/info"}
                component={() => <MemberInfo />}
              />
              <Route
                exact
                path={"/member/edit"}
                component={() => <MemberEdit />}
              />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
