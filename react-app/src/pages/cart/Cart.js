import React, { useEffect, useState } from "react";
import "./scss/cart.scss";
import axios from "axios";
import $ from "jquery";
import {
  DelCartData_Post,
  InsertCartData_Post,
  selectOneCart_Post,
  InsertOrderData
} from "./Actions";
import store from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const CartData = useSelector(state => state.CartData);
  const OrderCart = useSelector(state => state.OrderCart);
  const MemberLogState = useSelector(state => state.MemberLogState);

  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const [bonus, setBonus] = useState(null);
  let count = total;
  console.log(bonus);

  useEffect(() => {
    console.log("update");
    console.log(CartData);
    console.log(OrderCart);
    count = 0;
    OrderCart.length > 0 &&
      OrderCart.forEach(element => {
        count = count + element.product_price * element.product_quantity;
      });
    console.log(typeof bonus);
    console.log(count);
    if (bonus && count > 0) {
      console.log(bonus.data.coupon_bonus + 5);
      count = count - bonus.data.coupon_bonus;
    }
    setTotal(count);
  }, [OrderCart]);

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
    axios
      .get("http://localhost:5000/member/checklogin", {
        withCredentials: true
      })
      .then(result => {
        if (result.data.status === "202") {
          return result.data.data;
        }
      })
      .then(result => {
        if (!result) {
          alert("請先登入");
          window.location.href = "http://localhost:3000/home/";
        }
      })
      .catch();
  }, []);

  let option_i = [];
  for (let i = 1; i <= 20; ++i) {
    option_i.push(<option value={i}>{i}個</option>);
  }
  return (
    <>
      <div className="cart-container">
        <div className="step-icon-items">
          <div className="step1">
            <div className={`icon-item  ${step == 0 && "step-bgc-color"}`}>
              <div className="icon">1</div>
            </div>
            <span className={step == 0 && "step-color"}>確認金額＆數量</span>
          </div>
          <div
            className="step-connector"
            style={{ border: step == 1 && "1px solid #352c2a" }}
          ></div>
          <div className="step2">
            <div className={`icon-item  ${step == 1 && "step-bgc-color"}`}>
              <div className="icon">2</div>
            </div>
            <span className={step == 1 && "step-color"}>填寫資料與付款</span>
          </div>
        </div>
        <input
          type="checkbox"
          className="checkBox-all-input"
          id="chekBox-all-input"
          onClick={e => oderHandler(e)}
        />
        <label htmlFor="chekBox-all-input">選擇全部</label>
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
                    <span className="product-name">{item.product_name}</span>
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
                <span>{total}元</span>
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
                <span>輸入優惠卷</span>
                {/* <p className="error-text">請輸入正確號碼</p> */}
                <p className="success-text">可以使用</p>
                <input
                  type="text"
                  name="coupon"
                  onKeyUp={(e, memberSid) => handler(e, memberSid)}
                  placeholder="優惠碼"
                />
              </li>
              <li>
                <span>優惠卷折扣</span>
                <span>
                  {bonus
                    ? bonus.data.coupon_detail + bonus.data.coupon_bonus
                    : "未使用"}
                </span>
              </li>
              <li>
                <span>紅利折扣</span>
                <span>點</span>
              </li>
              <hr />
              <li className="total">
                <span>結帳總金額</span>
                <span>{total}元</span>
              </li>
              <li className="count-btn">
                <input
                  type="button"
                  value="前往結帳"
                  onClick={() => {
                    console.log(MemberLogState);
                    console.log(OrderCart);
                    console.log(bonus);
                    console.log(total);
                    if (total <= 0) {
                      alert("請選擇商品");
                    } else {
                      setStep(1);
                    }
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  async function handler(e, memberSid) {
    let { value, name } = e.target;
    if (e.which == 13 && name == "coupon") {
      if (total <= 0) {
        alert("請選擇商品");
        return;
      }
      fetch("http://localhost:5000/coupon/selectMemberCoupon", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          member_sid: MemberLogState.memberSid,
          coupon_sid: "",
          coupon_number: value
        })
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.status == "404") {
            alert(res.info);
            return;
          } else {
            if (res.data.member_coupon_used == 1) {
              alert("已被使用");
            } else {
              setBonus(res);
              setTotal(count - res.data.coupon_bonus);
            }
          }
          console.log(res);
          console.log(count);
        });
    }
  }

  function cartPost(count, product_sid, memberSid, sid) {
    let handler = true;
    dispatch(
      InsertCartData_Post(
        memberSid,
        product_sid,
        count,
        OrderCart,
        sid,
        handler
      )
    );
  }

  function delCartData(v, key) {
    let newVarray = [];
    newVarray.push(v);
    console.log(key);
    console.log(v);
    dispatch(DelCartData_Post(v.member_sid, v.cart_sid, key));
    let cart2 = CartData.filter(item => {
      return !newVarray.some(item2 => {
        console.log(item2);
        return item.cart_sid == item2.cart_sid;
      });
    });
    const action = InsertOrderData(cart2);
    dispatch(action);
  }

  function oderHandler(e) {
    console.log(e.target);
    if (e.target.checked) {
      const action = InsertOrderData(CartData);
      dispatch(action);
    } else {
      const action = InsertOrderData([]);
      dispatch(action);
    }
  }
  function cartCheck(sid, e) {
    dispatch(selectOneCart_Post(sid, e, OrderCart));
    console.log("274");
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
