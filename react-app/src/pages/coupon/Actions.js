export const GetCouponData = setCouponData => {
  fetch("http://localhost:5000/coupon", {
    method: "POST", // or 'PUT'
    body: null,
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res.data);
      setCouponData(res.data);
    })
    .catch(error => console.error("Error:", error));
};
export const InsertCouponData = (memberSid, coupon_sid) => {
  fetch("http://localhost:5000/coupon/insertCoupon", {
    method: "POST", // or 'PUT'
    body: JSON.stringify({
      member_sid: memberSid,
      coupon_sid: coupon_sid
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(res => {
      alert(res.info);
    })
    .catch(error => console.error("Error:", error));
};
