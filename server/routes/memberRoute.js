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
const bodyParser = require("body-parser");
const multer = require("multer"); //引入檔案
const upload = multer({ dest: "tmp_uploads" }); //設定檔案暫存目錄
const fs = require("fs"); //讀檔案寫檔案
bluebird.promisifyAll(db);
const session = require("express-session"); //session設定
router.use(
  session({
    //上面兩個未來預設可能會變成true先設定好
    saveUninitialized: false,
    resave: false,
    secret: "69",
    //存活時間cookie底下才有session
    cookie: {
      maxAge: 1200000
    }
  })
);

// 建構式
class Register {
  constructor(userName, email, password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
  registerCheckSQL() {
    let sql = `SELECT COUNT(member_email)
    FROM member
    WHERE member_email = "${this.email}"`;
    return sql;
  }
  registerSQL() {
    let sql = `INSERT INTO member(member_name, member_email, member_password) VALUES ("${this.userName}", "${this.email}", "${this.password}")`;
    return sql;
  }
}

//  建構式結束
router.get("/", (req, res) => {
  res.send("member-Page");
});

router.post("/register", (req, res) => {
  let register = new Register(
    req.body.userName,
    req.body.email,
    req.body.password
  );
  let registerSql = register.registerSQL();
  let registerCheckSQL = register.registerCheckSQL();
  db.queryAsync(register.registerCheckSQL())
    .then(results => {
      if (Object.values(results[0])[0]) {
        res.json({
          status: "404",
          message: "信箱已被註冊"
        });
      } else {
        return db.queryAsync(register.registerSQL());
      }
    })
    .then(results => {
      if (results && results.affectedRows == 1) {
        req.session.memberLoginID = results.insertId;
        res.json({
          status: "200",
          message: "會員註冊成功"
        });
      }
    })
    .catch(error => {
      console.log("error: " + error);
    });
});

module.exports = router;