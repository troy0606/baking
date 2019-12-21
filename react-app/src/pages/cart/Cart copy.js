import React, { useEffect, useState } from "react";
import "./scss/cart.scss";
import $ from "jquery";
import {
  GetCartData_Post,
  DelCartData_Post,
  InsertCartData_Post
} from "./Actions";
import store from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { GET_carData } from "./AcctionType";
import { GetCartData } from "./Actions";

function Cart() {
  const CartData = useSelector(state => state.CartData);
  const [memberSid, setMemberSid] = useState(1);
  const [orderCart, setOrderCart] = useState([]);
  useEffect(() => {
    $("#chekBox-all-input").click(function(e) {
      if (this.checked) {
        $(".check-box-product").prop("checked", true);
        $(".check-box-product").attr("checked", true);
        $(this).prop("checked", true);
        $(this).attr("checked", true);
        $(".cart-item").css("background", "#fff");
      } else {
        $(".check-box-product").prop("checked", false);
        $(".check-box-product").attr("checked", false);
        $(this).prop("checked", false);
        $(this).attr("checked", false);
        $(".cart-item").css("background", "none");
      }
    });
    $(".check-box-product").on("click", function(e) {
      if (this.checked) {
        $(this)
          .parent(".cart-item")
          .css("background", "#fff");
      }
      if (this.checked == false) {
        $(this)
          .parent(".cart-item")
          .css("background", "none");
      }
      allchk();
    });
  });
  useEffect(() => {
    console.log(orderCart, "這才是要傳給訂單的");
  }, [orderCart]);
  console.log(CartData, "cartData");
  let option_i = [];
  for (let i = 1; i <= 20; ++i) {
    option_i.push(<option value={i}>{i}個</option>);
  }

  return (
    <>
      <div className="cart-container">
        <div className="step-icon-items">
          <div className="step1">
            <div className="icon-item">
              <div className="icon">1</div>
            </div>
            <span>確認金額＆數量</span>
          </div>
          <div className="step-connector"></div>
          <div className="step2">
            <div className="icon-item">
              <div className="icon">2</div>
            </div>
            <span>填寫資料與付款</span>
          </div>
        </div>
        <input
          type="checkbox"
          className="checkBox-all-input"
          id="chekBox-all-input"
          onClick={e => oderHandler(e)}
        />
        <label htmlFor="chekBox-all-input">選擇全部</label>
        <div className="cart-shop">
          <div className="cart-shop-left">
            <ul className="cart-items">
              {CartData.map((item, key) => {
                return (
                  <li className="cart-item">
                    <input
                      type="checkbox"
                      className="check-box-product"
                      onClick={e => {
                        cartCheck(item.cart_sid, e);
                      }}
                    />
                    <div className="img-box">
                      <img
                        src={`/images/products/${item.product_img_1}`}
                        alt=""
                      />
                    </div>
                    <span className="product-name">
                      名稱:{item.product_name}
                    </span>
                    <div className="select-box">
                      <label htmlFor="">數量：</label>
                      <select
                        name=""
                        id="select-product-number"
                        onChange={e => {
                          console.log(e.target.value);
                          console.log(item.product_sid);
                          cartPost(
                            e.target.value,
                            item.product_sid,
                            item.member_sid,
                            item.cart_sid
                          );
                        }}
                      >
                        {option_i.map((op_item, op_key) => {
                          return (
                            <>
                              <option
                                value={`${op_key + 1}`}
                                selected={
                                  item.product_quantity == op_key + 1
                                    ? true
                                    : false
                                }
                              >
                                {op_key + 1}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    <span>{item.product_price * item.product_quantity}元</span>
                    <div
                      className="del-cart-item"
                      onClick={() => {
                        console.log(key);
                        delCartData(item, key);
                      }}
                    >
                      x
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="cart-shop-right">
            <h2>訂單摘要</h2>
            <ul>
              <li>
                <span>商品總價</span>
                <span>元</span>
              </li>
              <li>
                <span>目前紅利</span>
                <span>300點</span>
              </li>
              <li>
                <span>欲使用紅利</span>
                <input type="text" value="" />
              </li>
              <li>
                <span>使用優惠卷</span>
                <input type="text" value="" />
              </li>
              <li>
                <span>優惠卷折扣</span>
                <span>折</span>
              </li>
              <li>
                <span>紅利折扣</span>
                <span>點</span>
              </li>
              <hr />
              <li className="total">
                <span>結帳總金額</span>
                <span>500元</span>
              </li>
              <li className="count-btn">
                <input type="button" value="前往結帳" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
  function cartPost(count, product_sid, memberSid, sid) {
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
          store.dispatch(action);
        }
        alert(res.message);
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
            orderCart.forEach((items, i) => {
              console.log(items.cart_sid + "1");
              console.log(cart2[0].cart_sid + "2");
              if (items.cart_sid == cart2[0].cart_sid) {
                console.log(orderCart[i]);
                console.log(cart2[0]);
                orderCart[i] = cart2[0];
              }
            });
            console.log(cart2);
            console.log(cart2[0].cart_sid);
            setOrderCart(orderCart);
            console.log(orderCart, "這才是要傳給訂單的");
          })
          .catch(error => {
            console.log(error);
          });
      });
  }

  function delCartData(v, key) {
    let newVarray = [];
    newVarray.push(v);
    console.log(key);
    console.log(v);
    store.dispatch(DelCartData_Post(v.member_sid, v.cart_sid, key));
    let cart2 = orderCart.filter(item => {
      return !newVarray.some(item2 => {
        console.log(item2);
        return item.cart_sid == item2.cart_sid;
      });
    });
    setOrderCart(cart2);
  }
  function oderHandler(e) {
    console.log(e.target);
    if (e.target.checked) {
      setOrderCart(CartData);
    } else {
      setOrderCart([]);
    }
  }
  function cartCheck(sid, e) {
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
          console.log(orderCart);
          if (orderCart.length > 0) {
            console.log(1);
            orderCart.push(res.data[0]);
            setOrderCart(orderCart);
            console.log(orderCart, "這才是要傳給訂單的");
          }
          if (orderCart.length == 0) {
            console.log(2);
            setOrderCart(res.data);
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
          let cart2 = orderCart.filter(item => {
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
          setOrderCart(cart2);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  ///----
  function allchk() {
    var chknum = $(".cart-items :checkbox").length; //选项总个数
    var chk = 0;
    $(".cart-items :checkbox").each(function() {
      if ($(this).prop("checked")) {
        chk++;
      }
    });
    if (chknum == chk) {
      //全选
      $("#chekBox-all-input").attr("checked", true);
      $("#chekBox-all-input").prop("checked", true);
    } else {
      //不全选
      $("#chekBox-all-input").attr("checked", false);
      $("#chekBox-all-input").prop("checked", false);
    }
  }
}

export default Cart;
