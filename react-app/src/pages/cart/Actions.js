import { INSERT_carData } from "./AcctionType";
import { GET_carData } from "./AcctionType";
import { Del_cartData } from "./AcctionType";

export const InsertCartData = data => ({
  type: INSERT_carData,
  data
});
export const GetCartData = data => ({
  type: GET_carData,
  data
});
export const DelCartData = key => ({
  type: Del_cartData,
  key
});

export const InsertCartData_Post = (memberSid, product_sid, count) => {
  return dispatch => {
    fetch("http://localhost:5000/cart", {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify({
        member_sid: memberSid,
        product_sid: product_sid,
        quantity: count
      })
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        const data = res.data;
        console.log(res);
        if (res.data) {
          const action = GetCartData(data);
          dispatch(action);
        }
        alert(res.message);
      });
  };
};

export const GetCartData_Post = member_sid => {
  return dispatch => {
    fetch("http://localhost:5000/cart/smallcart", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        member_sid: member_sid
      }), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response => {
        const data = response.data;
        console.log(response);
        const action = GetCartData(data);
        dispatch(action);
      })
      .catch(error => console.error("Error:", error));
  };
};
export const DelCartData_Post = (member_sid, cart_sid, key) => {
  console.log(member_sid, cart_sid, key);
  return dispatch => {
    fetch("http://localhost:5000/cart/delSmallcart", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        member_sid: member_sid,
        product_sid: "",
        quantity: "",
        cart_sid: cart_sid
      }), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log("1");
        const action = DelCartData(key);
        dispatch(action);
      })
      .catch(error => console.error("Error:", error));
  };
};
