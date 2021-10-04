var mysql =require ('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'employeemanagementsystem'
})
connection.connect(function (err) {
    if (err) throw err
    console.log("connection sucess")

})
module.exports = connection;