import React, { useEffect, useState } from "react";
import "./scss/member.scss";
import { Link, Route, Switch } from "react-router-dom";
import MemberInfo from "./MemberInfo";
import MemberEdit from "./MemberEdit";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { UPLOAD_IMG } from "./ActionType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const dispatch = useDispatch();
  const MemberLogState = useSelector(state => state.MemberLogState);
  const [memberPic, setMemberPic] = useState(MemberLogState.memberPic);
  useEffect(() => {
    axios
      .get("http://localhost:5000/member/checklogin", {
        withCredentials: true
      })
      .then(result => {
        if (result.data.status !== "202") {
          toast.warn("請先登入");
          setTimeout(
            () => window.location.replace("http://localhost:3000/home"),
            3000
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMemberPic(MemberLogState.memberPic);
  }, [MemberLogState]);

  const clickChangePicBtn = () => {
    const editFlieButton = document.querySelector("#editPic");
    editFlieButton.click();
  };

  const changePic = e => {
    let file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    axios({
      method: "post",
      url: "http://localhost:5000/member/upload",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    }).then(result => {
      if (result.data.status === "202") {
        toast(result.data.message);
        setTimeout(
          () => dispatch({ type: UPLOAD_IMG, payload: result.data.memberPic }),
          3000
        );
      } else {
        toast.warn(result.data.message);
      }
    });
  };
  return (
    <>
      <div className="container member-container">
        <div className="row">
          <div className="col-4 member-side-bar">
            <ul>
              <li className="img-li">
                <div className="img-box">
                  <img
                    src={
                      memberPic
                        ? "http://localhost:5000/img/member/" + memberPic
                        : ""
                    }
                    alt=""
                  />
                </div>
                <div className="img-edit">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="editPic"
                    onChange={event => {
                      changePic(event);
                    }}
                  />
                  <p
                    onClick={() => {
                      clickChangePicBtn();
                    }}
                  >
                    編輯
                  </p>
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
                path={"/member/edit"}
                component={() => <MemberEdit />}
              />
              <Route
                exact
                path={"/member/:info?"}
                component={() => <MemberInfo />}
              />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
