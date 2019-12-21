import { LOG_IN, LOG_OUT, SIGN_UP_PERSON } from "./AcctionType";
import axios from "axios";

export const LOG_IN_ACTION = () => ({
  type: LOG_IN
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
      .post("http://localhost:5000/member/register", {
        userName,
        email,
        password
      })
      .then(result => {
        if (result.data.status == 200) {
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
        if (result.data.status == 200) {
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
