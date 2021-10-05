var express = require('express');
var router = express.Router();
var db = require('../config/db')

/* GET users listing. */
 router.get('/inn', function (req, res, next) {
     db.query("select working_table.emp_id,working_table.From_date,working_table.to_date,working_table.monthly_sallary,site_details.site_name from working_table INNER join site_details on working_table.employe_site_no=site_details.employee_site_no", (err, result) => {
         res.send(result)
     })
 });


  router.get('/single/:id', function (req, res, next) {
      db.query("select * from working_table where emp_id=?", [req.params.id], (err, result) => {
          res.send(result)
     })
  });

router.get('/workinghistory', function (req, res, next) {
    db.query("select work_history.work_id, work_history.emp_id,work_history.from_date,work_history.to_date,work_history.monthly_sallary,site_details.site_name from work_history INNER join site_details on work_history.site_no=site_details.employee_site_no",(err, result) => {
        res.send(result)
    })
});

 router.get('/workinghistory/:id/:from/:to', function (req, res, next) {
     db.query("select work_history.work_id, work_history.emp_id,work_history.from_date,work_history.to_date,work_history.monthly_sallary,site_details.site_name from work_history INNER join site_details on work_history.site_no=site_details.employee_site_no where from_date between ? and ? and emp_id=?", [req.params.from, req.params.to, req.params.id], (err, result) => {
         res.send(result)
     })
 });
router.post('/', function (req, res) {

    var data = req.body
    db.query("insert into working_table (emp_id,From_date,monthly_sallary,to_date,employe_site_no)values(?,?,?,?,?)", [data.emp_id,  data.From_date, data.monthly_sallary,data.to_date, data.employe_site_no], function (err, result) {
       try{ if (err) 
            throw err
       
      
        db.query("insert into work_history values (?,?,?,?,?,?)", [null, data.emp_id,  data.From_date, data.to_date, data.monthly_sallary, data.employe_site_no], function (err, result) {
            if (err) {
                throw err
            }
            
    
        })
    }
        catch {res.status(500).send({message:"failure"})}
    })
});
router.put('/:emp_id', function (req, res) {

    var data = req.body
    db.query("update working_table set From_date=?,to_date=?,monthly_sallary=?,employe_site_no=?  where emp_id=?", [data.From_date, data.to_date, data.monthly_sallary, data.employe_site_no, req.params.emp_id], function (err, result) {
        if (err) {
            throw err
        }

        db.query("insert into work_history values (?,?,?,?,?,?)", [null, data.emp_id,  data.From_date, data.to_date, data.monthly_sallary, data.employe_site_no], function (err, result) {
            if (err) {
                throw err
            }
            
    
        })
        res.send("data updated sucessfully")
    })
});

router.post('/history', function (req, res) {

    var data = req.body
    db.query("insert into work_history values (null,?,?,?,?,?,?,?)", [ data.emp_id,  data.From_date, data.to_date, data.monthly_sallary, data.employe_site_no], function (err, result) {
        if (err) {
            throw err
        }
        res.send("data saved into workhistory")

    })
});
router.delete('/:emp__id', function (req, res) {

    var data = req.body
    db.query("delete from working_table where emp_id=?", [req.params.emp__id], function (err, result) {

        if (err) {
            throw err
        }
        res.send("data deleted sucessfully")
    })
});
router.post('/addsite', function (req, res) {

    var data = req.body
    db.query("insert into site_details values (?,?)", [ data.employee_site_no,  data.site_name], function (err, result) {
       try{ if (err) 
            throw err
        
    
        res.send("data saved into site")
       }
        catch {res.status(500).send({message:"failure"})}

    })
});

module.exports = router;