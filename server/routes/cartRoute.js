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
const bluebird = require("bluebird"); //使用兩次sql
bluebird.promisifyAll(db);
//---------------------------------------
class cart_data {
  constructor(member_sid, product_sid, quantity, cart_sid) {
    this.member_sid = member_sid;
    this.product_sid = product_sid;
    this.quantity = quantity;
    this.cart_sid = cart_sid;
  }
  insertCart() {
    let sql = `INSERT INTO cart ( 
     member_sid, 
     product_sid,
     product_quantity) 
     VALUES 
     (
      ${this.member_sid},
      ${this.product_sid},
      ${this.quantity}
      )`;
    return sql;
  }
  selectCart() {
    let sql = `SELECT * FROM cart 
    INNER JOIN product  ON cart.product_sid = product.product_sid WHERE cart.member_sid = ${this.member_sid};`;
    return sql;
  }
  updataCart() {
    let sql = `UPDATE cart SET product_quantity = ${this.quantity} WHERE  member_sid = ${this.member_sid} AND product_sid = ${this.product_sid} `;
    return sql;
  }
  delCart() {
    let sql = `DELETE FROM cart WHERE member_sid =  ${this.member_sid} AND cart_sid = ${this.cart_sid} `;
    return sql;
  }
}

//---------------------------------------
router.post("/", (req, res) => {
  console.log(req.body);
  let data = new cart_data(
    req.body.member_sid,
    req.body.product_sid,
    req.body.quantity
  );
  db.queryAsync(data.selectCart())
    .then(result => {
      let carHandler = null;
      result.forEach(v => {
        if (
          v.product_sid == req.body.product_sid &&
          v.product_quantity != req.body.quantity
        ) {
          return (carHandler = false);
        }
        if (v.product_sid == req.body.product_sid) {
          return (carHandler = true);
        }
      });
      return carHandler;
    })
    .then(result => {
      switch (result) {
        case null:
          db.queryAsync(data.insertCart()).then(result => {
            if (result.affectedRows == 1) {
              db.queryAsync(data.selectCart()).then(result => {
                console.log(result);
                res.json({
                  status: "202",
                  message: "加入購物成功",
                  data: result
                });
              });
            } else {
              res.json({
                status: "402",
                message: "加入失敗"
              });
            }
          });
          break;
        case true:
          res.json({
            status: "202",
            message: "此商品已加入購物車"
          });
          break;
        case false:
          console.log(data.updataCart());
          db.queryAsync(data.updataCart()).then(result => {
            if (result.affectedRows == 1) {
              db.queryAsync(data.selectCart()).then(result => {
                console.log(result);
                res.json({
                  status: "202",
                  message: "數量變更成功",
                  data: result
                });
              });
            }
          });
      }
    })
    .catch(error => {
      console.log("error: " + error);
    });
});
router.post("/smallcart", (req, res) => {
  console.log(req.body);
  let data = new cart_data(req.body.member_sid);
  db.queryAsync(data.selectCart())
    .then(result => {
      if (result) {
        res.json({
          status: "202",
          message: "資料取得",
          data: result
        });
      } else {
        res.json({
          status: "402",
          message: "資料取得失敗"
        });
      }
    })
    .catch(error => {
      console.log("error: " + error);
    });
});
router.post("/delSmallcart", (req, res) => {
  console.log(req.body);
  let data = new cart_data(req.body.member_sid, "", "", req.body.cart_sid);
  console.log(data.delCart());
  db.queryAsync(data.delCart())
    .then(result => {
      if (result) {
        res.json({
          status: "202",
          message: "資料刪除"
        });
      } else {
        res.json({
          status: "402",
          message: "資料刪除失敗"
        });
      }
    })
    .catch(error => {
      console.log("error: " + error);
    });
});

module.exports = router;
