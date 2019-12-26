const express = require("express"); //引入express應用程式
const router = express.Router();
const mysql = require("mysql");
const db_Obj = {
  host: "localhost",
  user: "root",
  password: "",
  database: "baking_shop"
}; //連線到資料庫
const db = mysql.createConnection(db_Obj);
//---------------------------------------
class coupon_data {
  constructor(member_sid, coupon_sid, coupon_number) {
    (this.member_sid = member_sid),
      (this.coupon_sid = coupon_sid),
      (this.coupon_number = coupon_number);
  }
  getCouponData() {
    let sql = `SELECT * FROM coupon WHERE 1`;
    return sql;
  }
  insertCouponData() {
    let sql = `INSERT INTO member_coupon ( member_sid, coupon_sid) VALUES (${this.member_sid}, ${this.coupon_sid})`;
    return sql;
  }
  selectCouponData() {
    let sql = `  SELECT * FROM member_coupon WHERE member_sid = ${this.member_sid} && coupon_sid = ${this.coupon_sid}
    `;
    return sql;
  }
  selectMemberCouponData() {
    let sql = `SELECT * FROM member_coupon JOIN coupon ON member_coupon.coupon_sid = coupon.coupon_sid WHERE member_coupon.member_sid = ${this.member_sid} && coupon.coupon_number = ${this.coupon_number}
      `;
    return sql;
  }
}
//---------------------------------------
router.post("/", (req, res) => {
  let data = new coupon_data();
  console.log(data.getCouponData());
  db.query(data.getCouponData(), (error, rows) => {
    console.log(rows);
    if (rows) {
      res.json({
        status: 202,
        info: "資料獲取成功",
        data: rows
      });
      return;
    } else {
      res.json({
        status: 404,
        info: "資料獲取失敗"
      });
    }
  });
});
router.post("/insertCoupon", (req, res) => {
  let data = new coupon_data(req.body.member_sid, req.body.coupon_sid);
  console.log(data.insertCouponData());
  db.query(data.selectCouponData(), (error, rows) => {
    console.log(rows);
    if (rows.length > 0) {
      res.json({
        info: "已領取"
      });
    } else {
      db.query(data.insertCouponData(), (error, rows) => {
        if (rows.affectedRows > 0) {
          res.json({
            status: 202,
            info: "領取成功，請至優惠專區看詳情"
          });
        }
      });
    }
  });
});

router.post("/selectMemberCoupon", (req, res) => {
  let data = new coupon_data(
    req.body.member_sid,
    req.body.coupon_sid,
    req.body.coupon_number
  );
  console.log(req.body);
  console.log(data.selectMemberCouponData());
  db.query(data.selectMemberCouponData(), (error, rows) => {
    console.log(rows);
    if (rows.length > 0) {
      if (rows[0].member_coupon_used == 1) res.json({ info: "已使用" });
      if (rows[0].member_coupon_used == 0 && rows) {
        console.log(rows[0]);
        res.json({
          status: "202",
          info: "使用優惠眷",
          data: rows[0]
        });
      }
    } else {
      res.json({
        status: "404",
        info: "查無此優惠卷"
      });
    }
  });
});

module.exports = router;
