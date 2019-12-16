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
class cart_data {
  constructor() {}
  insertCart(member_sid, product_sid, quantity) {
    let sql = `INSERT INTO cart ( 
     member_sid, 
     product_sid,
     product_quantity) 
     VALUES 
     (
      ${member_sid},
      ${product_sid},
      ${quantity}
      )`;
    return sql;
  }
}
//---------------------------------------
router.post("/", (req, res) => {
  let data = new cart_data()
  let 
});

module.exports = router;
