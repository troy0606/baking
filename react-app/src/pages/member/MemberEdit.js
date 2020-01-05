import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./scss/member.scss";
import axios from "axios";
import { GiRoundStar } from "react-icons/gi";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { EDIT_MEMBER_INFO_ACTION } from "./Actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MemberEdit() {
  const dispatch = useDispatch();
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userOldPassword, setUserOldPassword] = useState("");
  const [userNewPassword2, setUserNewPassword2] = useState("");
  const [lockSubmit, setLockSubmit] = useState(true);
  const [warning, setWarning] = useState("");

  const submitChange = (userOldPassword, userPassword) => {
    if (userOldPassword === "") {
      toast.warn("請輸入舊密碼");
    } else {
      axios
        .post(
          "http://localhost:5000/member/changePassword",
          { userOldPassword, userNewPassword },
          {
            withCredentials: true
          }
        )
        .then(result => {
          if (result.data.status === "202") {
            toast(result.data.message);
            setTimeout(() => {
              window.location.replace("http://localhost:3000/member")
            }, 3000);
          } else if (result.data.status === "400") {
            toast.info(result.data.message);
          } else {
            toast.error(result.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const changeValue = e => {
    switch (e.target.name) {
      case "userOldPassword": {
        setUserOldPassword(e.target.value);
        break;
      }
      case "userNewPassword": {
        setUserNewPassword(e.target.value);
        break;
      }
      case "userNewPassword2": {
        setUserNewPassword2(e.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  function checkPasswordFormat(password) {
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    //Minimum eight characters, at least one letter and one number:
    if (password.search(pattern) === -1 && password !== "") {
      setWarning("請輸入正確格式");
      return false;
    } else {
      setWarning("格式正確");
      return true;
    }
  }

  const checkPassword = (userNewPassword, userNewPassword2) => {
    let flag = false;
    flag = checkPasswordFormat(userNewPassword);
    if (flag) {
      if (userNewPassword2 === "") {
        setWarning("請輸入確認密碼");
      } else if (userNewPassword !== userNewPassword2) {
        setWarning("密碼不一致");
      } else {
        setWarning("密碼一致");
      }
    }
  };

  const warningStyle = warning => {
    if (warning !== "密碼一致") {
      return {
        marginLeft: "50px",
        color: "red",
        fontWeight: "bold",
        fontSize: "14px"
      };
    } else {
      return {
        marginLeft: "50px",
        color: "green",
        fontWeight: "bold",
        fontSize: "14px"
      };
    }
  };

  useEffect(() => {
    if (warning === "密碼一致") {
      setLockSubmit(false);
    }
  }, [warning]);
  return (
    <>
      <div className="container px-4">
        <head className="member_head">
          <h3>修改密碼</h3>
          <div className="d-flex justify-content-end flex-grow-1">
            <div
              className="d-flex align-items-center"
              onClick={
                lockSubmit
                  ? ""
                  : () => submitChange(userOldPassword, userNewPassword)
              }
              style={
                lockSubmit
                  ? { cursor: "not-allowed", pointerEvent: "none" }
                  : {}
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
        </head>
        <wrapper className="member_body">
          <ul>
            <li>
              <h5>輸入舊密碼</h5>
              <input
                type="password"
                name="userOldPassword"
                onChange={event => {
                  changeValue(event);
                }}
                value={userOldPassword}
              />
            </li>
            <li>
              <h5>輸入新密碼</h5>
              <input
                type="password"
                name="userNewPassword"
                onChange={event => {
                  changeValue(event);
                }}
                onKeyUp={() => {
                  checkPassword(userNewPassword, userNewPassword2);
                }}
                title="必須包含一個數字或一個英文字，共8碼"
                value={userNewPassword}
                required
              />
            </li>
            <li>
              <h5>確認新密碼</h5>
              <input
                type="password"
                name="userNewPassword2"
                onChange={event => {
                  changeValue(event);
                }}
                onKeyUp={() => {
                  checkPassword(userNewPassword, userNewPassword2);
                }}
                value={userNewPassword2}
                required
              />
              <span style={warningStyle(warning)}>{warning}</span>
            </li>
          </ul>
        </wrapper>
      </div>
    </>
  );
}

export default MemberEdit;
