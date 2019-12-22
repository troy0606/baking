import { LOG_IN, LOG_OUT, SIGN_UP_PERSON } from "./AcctionType";
import axios from "axios";
// axios.defaults.withCredentials = true;

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
          dispatch(LOG_IN_ACTION());
        }
        return result;
      })
      .then(result => {
        alert(result.data.message);
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
        alert(result.data.message);
      })
      .catch(err => {
        console.error(err);
      });
  };
};
