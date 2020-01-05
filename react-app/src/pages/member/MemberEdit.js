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
  const [userPassword, setUserPassword] = useState(false);

  const submitChange = userPassword => {
    axios
      .post(
        "http://localhost:5000/member/changepassword",
        { userPassword },
        {
          withCredentials: true
        }
      )
      .then(result => {
        if (result.data.status === "202") {
          const userPassword = result.data.userPassword;
          toast(result.data.message);
          setTimeout(() => {
            setUserPassword(userPassword);
          }, 3000);
        } else if (result.data.status === "200") {
          toast.info(result.data.message);
        } else {
          toast.error(result.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container px-4">
        <head className="member_head">
          <h3>修改密碼</h3>
          <div className="d-flex">
            <div className="d-flex w-100 justify-content-between">
              <div className="d-flex align-items-center">
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
                onClick={() => submitChange(userPassword)}
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
          </div>
        </head>
        <wrapper className="member_body">
          <ul>
            <li>
              <h5>輸入舊密碼</h5>
              <input type="password" name="userOldPassword" />
            </li>
            <li>
              <h5>輸入新密碼</h5>
              <input type="password" name="userNewPassword" />
            </li>
            <li>
              <h5>確認新密碼</h5>
              <input type="password" name="userNewPassword2" />
            </li>
          </ul>
        </wrapper>
      </div>
    </>
  );
}

export default MemberEdit;
