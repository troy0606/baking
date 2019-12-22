import { INSERT_carData } from "./AcctionType";
import { GET_carData } from "./AcctionType";
import { Del_cartData } from "./AcctionType";
import { INSERT_orderData } from "./AcctionType";

export const InsertCartData = data => ({
  type: INSERT_carData,
  data
});
export const InsertOrderData = data => ({
  type: INSERT_orderData,
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




///---------
export const InsertCartData_Post = (
  memberSid,
  product_sid,
  count,
  OrderCart,
  sid,
  handler
) => {
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
        if (handler) {
          fetch("http://localhost:5000/cart/selectOneCart", {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json"
            }),
            body: JSON.stringify({
              member_sid: "",
              product_sid: "",
              quantity: "",
              cart_sid: sid
            })
          })
            .then(res => {
              return res.json();
            })
            .then(res => {
              console.log("insert");
              let cart2;
              cart2 = res.data;
              OrderCart.forEach((items, i) => {
                console.log(items.cart_sid + "1");
                console.log(cart2[0].cart_sid + "2");
                if (items.cart_sid == cart2[0].cart_sid) {
                  console.log(OrderCart[i]);
                  console.log(cart2[0]);
                  OrderCart[i] = cart2[0];
                }
              });
              console.log(cart2);
              console.log(cart2[0].cart_sid);
              const action = InsertOrderData(OrderCart);
              dispatch(action);
              // console.log(orderCart, "這才是要傳給訂單的");
            })
            .catch(error => {
              console.log(error);
            });
        }
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

export const selectOneCart_Post = (sid, e, OrderCart) => {
  console.log(1);
  return dispatch => {
    if (e.target.checked == true) {
      fetch("http://localhost:5000/cart/selectOneCart", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          member_sid: "",
          product_sid: "",
          quantity: "",
          cart_sid: sid
        })
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log("insert");
          if (OrderCart.length > 0) {
            OrderCart.push(res.data[0]);
            const action = InsertOrderData(OrderCart);
            dispatch(action);
          }
          if (OrderCart.length == 0) {
            const action = InsertOrderData(res.data);
            dispatch(action);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      fetch("http://localhost:5000/cart/selectOneCart", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          member_sid: "",
          product_sid: "",
          quantity: "",
          cart_sid: sid
        })
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          let cart2 = OrderCart.filter(item => {
            console.log(
              !res.data.some(item2 => {
                return item.cart_sid == item2.cart_sid;
              })
            );
            return !res.data.some(item2 => {
              console.log(item2);
              return item.cart_sid == item2.cart_sid;
            });
          });
          const action = InsertOrderData(cart2);
          dispatch(action);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
};
