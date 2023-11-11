const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const session = require('express-session');
const memorystore = require('memorystore')(session);
const con = require('./config/db');

const app = express();

// set the public folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ Function Page ================
app.get("/dashboard", function (_req, res) {
    const sql = "SELECT * FROM borrowrequests";

    con.query(sql, function (err, results) {
        if (err) {
            res.status(500).send("Database server error");
        }
        else {
            res.json(results);
        }
    });
});


// ============ Page routes =================

// ------------ borrowing -----------

// -----------  approve -------------

// -----------  approve:id -------------

// -----------  Dashboard -------------
app.get('/Dashboard', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/w1/dashboard.html'));
});
// -----------  history -------------

// ------------ root service ----------
app.get('/', function (req, res) {
    // if(req.session.role == 1) {
    //     res.redirect('/welcome');
    // }
    // else if(req.session.role == 2) {
    //     res.redirect('/shop');
    // }
    // else {
    //     res.sendFile(path.join(__dirname, 'views/login_template.html'));
    // }    
    res.sendFile(path.join(__dirname, 'views/w1/dashboard.html'));
});

const PORT = 3000;
app.listen(PORT, function () {
    console.log('Server is runnint at port ' + PORT);
});