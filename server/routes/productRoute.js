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
class products_data {
  constructor(product_category) {
    this.product_category = product_category;
  }
  getProductsData() {
    let sql = `SELECT * FROM product WHERE 1 ${
      this.product_category
        ? "And product_category =" + this.product_category
        : ""
    }`;
    return sql;
  }
}
//---------------------------------------
router.post("/", (req, res) => {
  let data = new products_data(req.body.product_category);
  db.query(data.getProductsData(), (error, rows) => {
    console.log(rows);
    if (rows.length >= 0) {
      res.json({
        status: "202",
        data: rows
      });
      return;
    }
    if (rows.length <= 0) {
      res.json({
        status: "404",
        message: "error no data"
      });
      return;
    }
  });
});

module.exports = router;
