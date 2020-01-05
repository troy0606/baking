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
const moment = require("moment-timezone"); //解析時間格式

router.use(
  session({
    //上面兩個未來預設可能會變成true先設定好
    saveUninitialized: false,
    resave: false,
    secret: "69",

    //存活時間cookie底下才有session
    cookie: { maxAge: 8 * 60 * 60 * 1000 }
  })
);

// 建構式
class MemberSimpleInfo {
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
  logInCheckSQL() {
    let sql = `SELECT COUNT(member_email)
    FROM member
    WHERE member_email = "${this.email}"`;
    return sql;
  }
  logInSQL() {
    let sql = `SELECT * FROM member WHERE member_email = "${this.email}" && member_password = "${this.password}"`;
    return sql;
  }
}

//  建構式結束

router.get("/checklogin", (req, res) => {
  if (req.session.memberLoginID) {
    db.queryAsync(
      `SELECT * FROM member WHERE member_sid = ${req.session.memberLoginID}`
    ).then(result => {
      result[0].member_birth = moment(result[0].member_birth)
        .tz("Asia/Taipei")
        .format("YYYY-MM-DD");
      res.json({
        status: "202",
        message: "登入",
        data: result[0]
      });
    });
  } else {
    res.json({
      status: "404",
      message: "還未登入"
    });
  }
});

router.post("/login", (req, res) => {
  let logIn = new MemberSimpleInfo(" ", req.body.email, req.body.password);
  db.queryAsync(logIn.logInCheckSQL())
    .then(results => {
      if (!Object.values(results[0])[0]) {
        res.json({
          status: "404",
          message: "無此信箱"
        });
      } else {
        return db.queryAsync(logIn.logInSQL());
      }
    })
    .then(results => {
      if (results.length !== 0) {
        req.session.memberLoginID = results[0].member_sid;
        res.json({
          status: "200",
          message: "會員登入",
          memberSid: results[0].member_sid,
          memberName: results[0].member_name,
          memberPic: results[0].member_picture
        });
      } else {
        res.json({
          status: "404",
          message: "帳號或密碼有誤"
        });
      }
    })
    .catch(error => {
      console.log("error: " + error);
    });
});

router.post("/register", (req, res) => {
  let register = new MemberSimpleInfo(
    req.body.userName,
    req.body.email,
    req.body.password
  );
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
        return db.queryAsync(
          `SELECT member_sid,member_name,member_picture FROM member WHERE member_sid = ${results.insertId}`
        );
      } else {
        res.json({
          status: "500",
          message: "伺服器錯誤"
        });
      }
    })
    .then(results => {
      req.session.memberLoginID = results[0].member_sid;
      res.json({
        status: "200",
        message: "會員註冊成功",
        memberSid: results[0].member_sid,
        memberName: results[0].member_name,
        memberPic: results[0].member_picture
      });
    })
    .catch(error => {
      console.log("error: " + error);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.memberLoginID === req.body.memberSid) {
    delete req.session.memberLoginID;
    res.json({
      status: "200",
      message: "會員登出成功"
    });
  } else {
    res.json({
      status: "404",
      message: "會員登出失敗"
    });
  }
});

router.post("/upload", upload.single("file"), (req, res) => {
  //單張圖片上傳
  if (req.file && req.file.originalname) {
    switch (req.file.mimetype) {
      case "image/png":
      case "image/jpeg":
      case "image/jpg":
        fs.createReadStream(req.file.path) //讀檔案
          .pipe(
            //串進去
            fs.createWriteStream("./public/img/member/" + req.file.originalname) //寫檔案
          );
        db.query(
          `UPDATE member SET member_picture = "${req.file.originalname}" WHERE member_sid = ${req.session.memberLoginID}`,
          function(err, result) {
            if (result.affectedRows === 0) {
              res.json({
                status: "404",
                message: "圖片上傳失敗(資料庫問題"
              });
              throw err;
            } else {
              res.json({
                status: "202",
                message: "圖片上傳成功",
                memberPic: req.file.originalname
              });
            }
          }
        );
        break;
      default:
    }
  } else {
    res.json({
      status: "404",
      message: "圖片上傳失敗(伺服器問題"
    });
  }
});

router.post("/changeInfo", (req, res) => {
  let { userEmail, userName, userBirth, userPhone, userAddress } = req.body;
  db.queryAsync(
    `SELECT * FROM member Where member_sid = ${req.session.memberLoginID}`
  ).then(results => {
    let {
      member_email,
      member_name,
      member_birth,
      member_phone,
      member_address
    } = results[0];
    member_birth = moment(member_birth)
      .tz("Asia/Taipei")
      .format("YYYY-MM-DD");
    if (
      member_email === userEmail &&
      member_name === userName &&
      member_birth === userBirth &&
      member_phone === userPhone &&
      member_address === userAddress
    ) {
      res.json({ status: "200", message: "資料沒有修改" });
    } else {
      return db.query(
        `UPDATE member SET member_email = "${userEmail}" ,
        member_name = "${userName}" ,
        member_birth = "${userBirth}" ,
        member_phone = "${userPhone}" ,
        member_address = "${userAddress}" 
        WHERE member_sid = ${req.session.memberLoginID}`,
        (err, result) => {
          if (result && result.affectedRows === 0) {
            res.json({
              status: "404",
              message: "資料修改失敗(資料庫問題"
            });
            throw err;
          } else {
            res.json({
              status: "202",
              message: "資料修改成功",
              memberData: req.body
            });
          }
        }
      );
    }
  });
});

router.post("/changePassword", (req, res) => {
  let { userOldPassword, userNewPassword } = req.body;
  db.queryAsync(
    `SELECT * FROM member Where member_sid = ${req.session.memberLoginID}`
  ).then(results => {
    const member_password = results[0].member_password;
    if (member_password !== userOldPassword) {
      res.json({ status: "400", message: "舊密碼不符" });
    } else if (member_password === userNewPassword) {
      res.json({ status: "400", message: "密碼沒有修改" });
    } else {
      return db.query(
        `UPDATE member SET member_password = "${userNewPassword}" WHERE member_sid = ${req.session.memberLoginID}`,
        (err, result) => {
          if (result && result.affectedRows === 0) {
            res.json({
              status: "404",
              message: "密碼修改失敗(資料庫問題"
            });
            throw err;
          } else {
            res.json({
              status: "202",
              message: "密碼修改成功"
            });
          }
        }
      );
    }
  });
});

module.exports = router;
