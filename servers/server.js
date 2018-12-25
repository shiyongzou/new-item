var express = require('express')
var app = express()
var http = require('http');
var querystring = require('querystring')
var mysql = require('mysql')
// 配置模块node
var settings = require('./settings')
// 连接数据库
var connection = mysql.createConnection(settings.db)
connection.connect()
// 查询
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

//查询数据库
app.get('/api', (req, res) => {
                  // 查询的表 
  const sqlStr = 'select * from character_data '
  connection.query(sqlStr, (err, results) => {
      if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
      res.json({ err_code: 200, message: results})
  })
})
//登陆
app.post('/user/landing', (req, res) => {
  var body = "";
   var data=''
  //请求链接
  //每当接收到请求体数据，累加到post中
  req.on('data', function (chunk) {
      body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
      console.log("chunk:",chunk);
  });
  //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on('end', function () {
      // 解析参数
      body = querystring.parse(body);  //将一个字符串反序列化为一个对象
      data=JSON.parse(Object.keys(body)[0])
      const sqlStr =`select * from  user_register where userName = '${data.userName}' and passWord = '${data.passWord}'`
      connection.query(sqlStr, (err, results) => {
      if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
      res.json({ err_code: 200, userName : results[0].userName,userId : results[0].userId})
      })
  })
 
})
//注册
app.post('/user/register', (req, res) => {
    var body = "";
     var data=''
    //请求链接
    //每当接收到请求体数据，累加到post中
    req.on('data', function (chunk) {
        body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
        console.log("chunk:",chunk);
    });
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function () {
        // 解析参数
        body = querystring.parse(body);  //将一个字符串反序列化为一个对象
        data=JSON.parse(Object.keys(body)[0])
        const addSql =`INSERT INTO user_register(userName,passWord) VALUES(?,?)`
        const addSqlParams = [data.userName,data.passWord];
        connection.query(addSql,addSqlParams, (err, results) => {
            if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
            res.json({ err_code: 200, message: results})
        })
    })
   
  })
//插入数据库   不能重复插入
app.get('/add',(req,res)=>{
             //    插入指令      表名                插入的键          插入的值？
  const addSql = 'INSERT INTO character_data(id,age,birthday,name) VALUES(?,?,?,?)';
                   //    插入值    传值时一定要严格按类型传
  const addSqlParams = [8, 10000,'1996-10-12-04:00:00', '玉帝'];
  connection.query(addSql,addSqlParams, (err, results) => {
    if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
    res.json({ err_code: 200, message: results})
})
})
//更新数据库
app.get('/update',(req,res)=>{
              //    更新指令      表名   更改  的      内          容        唯一属性           
  const modSql = 'UPDATE character_data SET age = ?,birthday = ?,name=? WHERE id = ?';
  const modSqlParams = [15,'1991-10-12-04:00:00','李白',5];
  connection.query(modSql,modSqlParams, (err, results) => {
    if (err) return console.log(err)
    res.json({ err_code: 200, message: results})
})
})
//删除数据库
app.get('/delete',(req,res)=>{
            //    删除指令      表名                唯一属性
  const delSql = 'DELETE FROM character_data where id=6';
  connection.query(delSql, (err, results) => {
    if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
    res.json({ err_code: 200, message: results})
})
})
// 关闭连接
// connection.end()
app.listen(8888)
