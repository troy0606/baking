import React, { useState, useEffect } from "react";
import "./scss/member.scss";
import { LOG_IN_ACTION, SIGN_UP_ACTION } from "./Actions";
import { useDispatch } from "react-redux";

const MemberLogIn_SignUp = () => {
  const [switchSign, setSwitchSign] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checkType, setCheckType] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (loading && switchSign) {
      checkEmail(email);
    }
    function checkEmail(email) {
      let pattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      if (email.search(pattern) === -1 && email !== "") {
        setCheckType("請輸入正確信箱格式");
      } else {
        setCheckType("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (loading && switchSign) {
      checkPassword(password);
    }
    function checkPassword(password) {
      let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      //Minimum eight characters, at least one letter and one number:
      if (password.search(pattern) === -1 && password !== "") {
        setCheckType("請輸入正確密碼格式");
      } else {
        setCheckType("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);
  return (
    <>
      <div className="backGroundImg d-flex justify-content-center align-items-center">
        <div className="switch_card">
          <div className="card" style={switchSign ? { left: "-23rem" } : {}}>
            <h2 className="w-100">會員登入</h2>
            <div className="card-body d-flex justify-content-around flex-column align-content-center">
              <form className="d-flex flex-column justify-content-around align-content-around h-100">
                <div className="form-row d-flex flex-column justify-content-around h-100">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="login_email"
                      placeholder="信箱"
                      title="請輸入信箱"
                      onKeyUp={event => {
                        setEmail(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="login_password"
                      placeholder="密碼"
                      onKeyUp={event => {
                        setPassword(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <h2
                    className="login_btn"
                    onClick={() => {
                      dispatch(LOG_IN_ACTION());
                    }}
                  >
                    登入
                  </h2>
                </div>
              </form>
              <div className="flex-shrink-0 text-center forget_signUp">
                <span>忘記密碼</span> /{" "}
                <span
                  onClick={() => {
                    setSwitchSign(true);
                  }}
                >
                  註冊
                </span>
              </div>
            </div>
          </div>
          <div className="card" style={switchSign ? {} : { left: "23rem" }}>
            <h2 className="w-100">會員註冊</h2>
            <div className="card-body d-flex justify-content-around flex-column align-content-center">
              <form className="d-flex flex-column justify-content-around align-content-around h-100">
                <div className="form-row d-flex flex-column justify-content-around h-100">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="signUp_name"
                      placeholder="姓名"
                      title="請輸入使用者姓名"
                      onKeyUp={event => {
                        setUserName(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="signUp_email"
                      placeholder="信箱"
                      title="請輸入信箱"
                      onKeyUp={event => {
                        setEmail(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="signUp_password"
                      title="必須包含一個數字或一個英文字，共8碼"
                      placeholder="密碼"
                      onKeyUp={event => {
                        setPassword(event.target.value);
                      }}
                      required
                    />
                  </div>
                  {checkType ? (
                    <p className="checkWarning">{checkType}</p>
                  ) : (
                    <></>
                  )}
                  <h2
                    className="login_btn"
                    onClick={() => {
                      dispatch(SIGN_UP_ACTION(userName, email, password));
                    }}
                  >
                    註冊
                  </h2>
                </div>
              </form>
              <div className="flex-shrink-0 text-center forget_signUp">
                <span
                  onClick={() => {
                    setSwitchSign(false);
                  }}
                >
                  登入
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberLogIn_SignUp;
