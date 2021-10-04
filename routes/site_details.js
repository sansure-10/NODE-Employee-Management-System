var express = require('express');
var router = express.Router();
var db = require('../config/db')

/* GET users listing. */
router.get('/', function (req, res, next) {
    db.query("select * from site_details", (err, result) => {
        res.send(result)
    })
});
router.post('/', function (req, res) {

    var data = req.body
    db.query("insert into site_details (employee_site_no,site_name)values(?,?)", [data.employee_site_no, data.site_name], function (err, result) {
        if (err) {
            throw err
        }
        res.send("data saved sucessfully")
    })
});



module.exports = router;
