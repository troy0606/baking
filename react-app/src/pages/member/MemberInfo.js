import React, { useEffect, useState } from "react";
import "./scss/member.scss";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { GiRoundStar } from "react-icons/gi";

function MemberInfo() {
  const [step, setStep] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userLevel, setUserLevel] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:5000/member/checklogin", {
        withCredentials: true
      })
      .then(result => {
        if (result.data.status === "202") {
          setUserEmail(result.data.member_email);
          setUserName(result.data.member_name);
          setUserBirth(result.data.member_birth);
          setUserPhone(result.data.member_phone);
          setUserAddress(result.data.member_address);
          setUserLevel(result.data.member_level);
        } else {
          alert(result.data.message);
          window.history.go(-1);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div class="container px-4">
        <div class="member_head">
          <h3>會員資訊</h3>
          {/* {userLevel.map(()=>())} */}
          <GiRoundStar style={{ color: "#de726b", fontSize: "18px" }} />
        </div>
      </div>
    </>
  );
}

export default MemberInfo;
