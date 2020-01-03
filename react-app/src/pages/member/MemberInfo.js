import React, { useEffect, useState } from "react";
import "./scss/member.scss";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { GiRoundStar } from "react-icons/gi";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";

function MemberInfo() {
  const [step, setStep] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userLevel, setUserLevel] = useState(0);
  useEffect(() => {
    if (!step) {
      axios
        .get("http://localhost:5000/member/checklogin", {
          withCredentials: true
        })
        .then(result => {
          setUserEmail(result.data.data.member_email);
          setUserName(result.data.data.member_name);
          setUserBirth(result.data.data.member_birth);
          setUserPhone(result.data.data.member_phone);
          setUserAddress(result.data.data.member_address);
          setUserLevel(result.data.data.member_level);
          if (result.data.status === "202") {
            console.log(userName);
          } else {
            alert(result.data.message);
            window.history.go(-1);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    //eslint-disable-next-line
  }, [step]);

  const changeValue = e => {
    switch (e.target.name) {
      case "userEmail": {
        setUserEmail(e.target.value);
        break;
      }
      case "userName": {
        setUserName(e.target.value);
        break;
      }
      case "userBirth": {
        setUserBirth(e.target.value);
        break;
      }
      case "userPhone": {
        setUserPhone(e.target.value);
        break;
      }
      case "userAddress": {
        setUserAddress(e.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const submitChange = (
    userEmail,
    userName,
    userBirth,
    userPhone,
    userAddress
  ) => {
    axios
      .post(
        "http://localhost:5000/member/changeInfo",
        {
          userEmail,
          userName,
          userBirth,
          userPhone,
          userAddress
        },
        {
          withCredentials: true
        }
      )
      .then(result => {
        if (result.data.status === "202") {
          const {
            userEmail,
            userName,
            userBirth,
            userPhone,
            userAddress
          } = result.data.memberData;
          setUserEmail(userEmail);
          setUserName(userName);
          setUserBirth(userBirth);
          setUserPhone(userPhone);
          setUserAddress(userAddress);
          alert(result.data.message);
          setStep(false);
        } else {
          alert(result.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  let levelArr = [];
  for (let i = 0; i < userLevel; i++) {
    //記得在JSX中使用JS變數要用花括號包著
    levelArr.push(
      <GiRoundStar style={{ color: "#de726b", fontSize: "18px" }} />
    );
  }

  const dataMaximum = () => {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    return y + "-" + m + "-" + d;
  };

  return (
    <>
      <div className="container px-4">
        <head className="member_head">
          <h3>會員資訊</h3>
          <div>{levelArr}</div>
          <div className="d-flex">
            <div
              style={step ? { width: "160px", cursor: "default" } : {}}
              onClick={
                !step
                  ? () => {
                      setStep(true);
                    }
                  : ""
              }
            >
              {!step ? (
                <>
                  <h5>修改</h5>
                  <GoTriangleRight
                    style={{
                      fontSize: "36px",
                      color: "#eca061",
                      border: "none"
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="d-flex w-100 justify-content-between">
                    <div
                      className="d-flex align-items-center"
                      onClick={() => setStep(false)}
                    >
                      <GoTriangleLeft
                        style={{
                          fontSize: "36px",
                          color: "#eca061",
                          border: "none"
                        }}
                      />
                      <h5>取消</h5>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      onClick={() =>
                        submitChange(
                          userEmail,
                          userName,
                          userBirth,
                          userPhone,
                          userAddress
                        )
                      }
                    >
                      <h5>確定</h5>
                      <GoTriangleRight
                        style={{
                          fontSize: "36px",
                          color: "#eca061",
                          border: "none"
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </head>
        <wrapper className="member_body">
          <ul>
            <li>
              <h5>會員信箱</h5>
              <input
                type="text"
                placeholder={userEmail}
                style={step ? {} : { backgroundColor: "#ccc" }}
                disabled={!step}
                name="userEmail"
                onChange={
                  step
                    ? event => {
                        changeValue(event);
                      }
                    : ""
                }
              />
            </li>
            <li>
              <h5>會員名稱</h5>
              <input
                type="text"
                placeholder={userName}
                style={
                  step
                    ? { width: "160px" }
                    : { backgroundColor: "#ccc", width: "160px" }
                }
                disabled={!step}
                name="userName"
                onChange={
                  step
                    ? event => {
                        changeValue(event);
                      }
                    : ""
                }
              />
            </li>
            <li>
              <h5>會員生日</h5>
              <input
                type="date"
                value={userBirth}
                style={
                  step
                    ? { width: "150px" }
                    : { backgroundColor: "#ccc", width: "150px" }
                }
                max={dataMaximum()}
                disabled={!step}
                name="userBirth"
                onChange={
                  step
                    ? event => {
                        changeValue(event);
                      }
                    : ""
                }
              />
            </li>
            <li>
              <h5>會員電話</h5>
              <input
                type="text"
                placeholder={userPhone}
                style={
                  step
                    ? { width: "180px" }
                    : { backgroundColor: "#ccc", width: "180px" }
                }
                disabled={!step}
                name="userPhone"
                onChange={
                  step
                    ? event => {
                        changeValue(event);
                      }
                    : ""
                }
              />
            </li>
            <li>
              <h5>會員地址</h5>
              <input
                type="text"
                placeholder={userAddress}
                style={
                  step
                    ? { width: "280px" }
                    : { backgroundColor: "#ccc", width: "280px" }
                }
                disabled={!step}
                name="userAddress"
                onChange={
                  step
                    ? event => {
                        changeValue(event);
                      }
                    : ""
                }
              />
            </li>
          </ul>
        </wrapper>
      </div>
    </>
  );
}

export default MemberInfo;
