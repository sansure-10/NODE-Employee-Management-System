var express = require('express');
var router = express.Router();
var db = require('../config/db')

/* GET users listing. */

 router.get('/w', function (req, res, next) {
     db.query("select * from employees_basic_details ",(err, result) => {
        res.send(result)
     })
 });

 router.get('/siteno/:id', function (req, res, next) {
    db.query("select employees_basic_details.emp_id,employees_basic_details.First_Name,employees_basic_details.Last_Name,employees_basic_details.email,gender_details.Gender,nationality_details.NATIONALITY,state_details.State,district_details.district,employees_basic_details.Postal_Code,employees_basic_details.Qualification,site_details.site_name from employees_basic_details INNER join site_details on employees_basic_details.employee_site_no=site_details.employee_site_no INNER JOIN district_details ON employees_basic_details.District= district_details.district_no INNER JOIN  gender_details on employees_basic_details.Gender=gender_details.GENDER_KEY inner join state_details on employees_basic_details.State=state_details.state_no inner join nationality_details on employees_basic_details.Nationality=nationality_details.NATIONALITY_NO and employees_basic_details.employee_site_no=?",[req.params.id],(err, result) => {
        res.send(result)
    })
});
router.get('/inner', function (req, res, next) {
     db.query("select employees_basic_details.emp_id,employees_basic_details.First_Name,employees_basic_details.Middle_Name,employees_basic_details.Last_Name,employees_basic_details.email,gender_details.Gender,nationality_details.NATIONALITY,state_details.State,district_details.district,employees_basic_details.Postal_Code,employees_basic_details.Qualification,site_details.site_name from employees_basic_details INNER join site_details on employees_basic_details.employee_site_no=site_details.employee_site_no INNER JOIN district_details ON employees_basic_details.District= district_details.district_no INNER JOIN  gender_details on employees_basic_details.Gender=gender_details.GENDER_KEY inner join state_details on employees_basic_details.State=state_details.state_no inner join nationality_details on employees_basic_details.Nationality=nationality_details.NATIONALITY_NO"
 ,(err, result) => {
        res.send(result)
    })
 });
 router.get('/emp/:id', function (req, res, next) {
    db.query("select employees_basic_details.emp_id,employees_basic_details.First_Name,employees_basic_details.Last_Name,employees_basic_details.email,gender_details.Gender,nationality_details.NATIONALITY,state_details.State,district_details.district,employees_basic_details.Postal_Code,employees_basic_details.Qualification,site_details.site_name from employees_basic_details INNER join site_details on employees_basic_details.employee_site_no=site_details.employee_site_no INNER JOIN district_details ON employees_basic_details.District= district_details.district_no INNER JOIN  gender_details on employees_basic_details.Gender=gender_details.GENDER_KEY inner join state_details on employees_basic_details.State=state_details.state_no inner join nationality_details on employees_basic_details.Nationality=nationality_details.NATIONALITY_NO and employees_basic_details.emp_id=?",[req.params.id],(err, result) => {
        res.send(result)
    })
});

router.get('/:id', function (req, res, next) {
    db.query("select employees_basic_details.emp_id,employees_basic_details.First_Name,employees_basic_details.Middle_Name,employees_basic_details.Last_Name,employees_basic_details.email,gender_details.Gender,nationality_details.NATIONALITY,state_details.State,district_details.district,employees_basic_details.Postal_Code,employees_basic_details.Qualification,site_details.site_name from employees_basic_details INNER join site_details on employees_basic_details.employee_site_no=site_details.employee_site_no and employees_basic_details.emp_id =? INNER JOIN district_details ON employees_basic_details.District= district_details.district_no INNER JOIN  gender_details on employees_basic_details.Gender=gender_details.GENDER_KEY inner join state_details on employees_basic_details.State=state_details.state_no inner join nationality_details on employees_basic_details.Nationality=nationality_details.NATIONALITY_NO"
    ,[req.params.id],(err, result) => {
        res.send(result)
    })
});
router.post('/', function (req, res) {
   
    var data=req.body
    db.query("insert into employees_basic_details values(?,?,?,?,?,?,?,?,?,?,?,?)",[null,data.First_Name,data.Middle_Name,data.Last_Name,data.email,data.Gender,data.Nationality,data.State,data.District,data.Postal_Code,data.Qualification,data.employee_site_no,],function(err,result){
        if(err){
            throw err
        }
        res.send({message:"saved"})
    })
});
router.put('/:id',function(req,res){
    var data= req.body
    db.query("update employees_basic_details set First_Name=?,Last_Name=?,email=?,Gender=?,Nationality=?,State=?,District=?,Postal_Code=?,Qualification=?,employee_site_no=? where emp_id=?",[data.First_Name,data.Last_Name,data.email,data.Gender,data.Nationality,data.State,data.District,data.Postal_Code,data.Qualification,data.employee_site_no,req.params.id],function(err,result){

        if(err){
            throw err
        }
        res.send("data updated sucessfully")
    })
});

router.delete('/:id',function(req,res){
    var data= req.body
    db.query("delete from employees_basic_details  where emp_id=?",[req.params.id],function(err,result){

        if(err){
            throw err
        }
        res.send("data deleted sucessfully")
    })
});
router.get("/gender_details/gender", (req, res) => {
    db.query("SELECT * FROM gender_details ", function (err, result) {

        res.send(result)
    })
})

router.get("/nationality_details/nation", (req, res) => {
    db.query("SELECT * FROM nationality_details ", function (err, result) {

        res.send(result)
    })
})

router.get("/district_details/district", (req, res) => {
    db.query("SELECT * FROM district_details", function (err, result) {

        res.send(result)
    })
})
router.get("/site_details/site", (req, res) => {
    db.query("SELECT * FROM site_details", function (err, result) {

        res.send(result)
    })
})
router.get("/state_details/state", (req, res) => {
    db.query("SELECT * FROM state_details", function (err, result) {

        res.send(result)
    })
})



module.exports = router;
