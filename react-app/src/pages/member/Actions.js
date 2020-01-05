import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP_PERSON,
  EDIT_MEMBER_INFO
} from "./ActionType";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LOG_IN_ACTION = memberInfo => ({
  type: LOG_IN,
  payload: memberInfo
});

export const LOG_OUT_ACTION = () => ({
  type: LOG_OUT
});

export const SIGN_UP_PERSON_ACTION = message => ({
  type: SIGN_UP_PERSON,
  payload: message
});

export const EDIT_MEMBER_INFO_ACTION = userName => ({
  type: EDIT_MEMBER_INFO,
  payload: userName
});

export const SIGN_UP_ACTION = (userName, email, password) => {
  return dispatch => {
    axios
      .post(
        "http://localhost:5000/member/register",
        {
          userName,
          email,
          password
        },
        {
          withCredentials: true
        }
      )
      .then(result => {
        if (result.data.status === "200") {
          let memberInfo = {
            memberSid: result.data.memberSid,
            memberName: result.data.memberName,
            memberPic: result.data.memberPic
          };
          dispatch(LOG_IN_ACTION(memberInfo));
        }
        return result;
      })
      .then(result => {
        if (result.data.status === "200") {
          toast(result.data.message);
          setTimeout(() => window.history.go(-1), 3000);
        } else {
          toast.error(result.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const LOGIN_ACTION = (email, password) => {
  return dispatch => {
    axios
      .post(
        "http://localhost:5000/member/login",
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )
      .then(result => {
        if (result.data.status === "200") {
          let memberInfo = {
            memberSid: result.data.memberSid,
            memberName: result.data.memberName,
            memberPic: result.data.memberPic
          };
          dispatch(LOG_IN_ACTION(memberInfo));
        }
        return result;
      })
      .then(result => {
        if (result.data.status === "200") {
          toast(result.data.message);
          setTimeout(() => window.history.go(-1), 3000);
        } else {
          toast.error(result.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const LOGOUT_ACTION = memberSid => {
  return dispatch => {
    axios
      .post(
        "http://localhost:5000/member/logout",
        {
          memberSid
        },
        {
          withCredentials: true
        }
      )
      .then(result => {
        if (result.data.status === "200") {
          dispatch(LOG_OUT_ACTION());
        }
        return result;
      })
      .then(result => {
        if (result.data.status === "200") {
          toast(result.data.message);
          setTimeout(() => window.history.go(-1), 3000);
        } else {
          toast.error(result.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
};
