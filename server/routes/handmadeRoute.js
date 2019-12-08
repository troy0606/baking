const express = require('express');//引入express應用程式
const router = express.Router();
const mysql = require('mysql');
const db_Obj = require('C:/Users/__connect.json'); //連線到資料庫
const db = mysql.createConnection(db_Obj);

router.get('/',(req,res)=>{
    res.send("handmade-Page");
});


module.exports = router;