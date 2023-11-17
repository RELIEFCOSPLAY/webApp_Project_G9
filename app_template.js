const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const memorystore = require("memorystore")(session);
const con = require("./config/db");

const app = express();

// set the public folder
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ Function Page ================

// dashbord
app.get("/dashboard", function (_req, res) {
  const sql = "SELECT * FROM borrowreq";

  con.query(sql, function (err, results) {
    if (err) {
      res.status(500).send("Database server error");
    } else {
      res.json(results);
    }
  });
});

//Approve or disapprove
app.get("/approve", function (_req, res) {
  const sql = "SELECT * FROM borrowreq";

  con.query(sql, function (err, results) {
    if (err) {
      res.status(500).send("Database server error");
    } else {
      res.json(results);
    }
  });
});

app.put("/approve/:Reqid", function (req, res) {
  const updateProduct = req.body;
  const id = req.params.Reqid;
  const sql = "UPDATE borrowreq SET ? WHERE Reqid = ?";

  con.query(sql, [updateProduct, id], function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    } else {
      res.json(results);
    }
  });
});

//History
// app.get("/history", function (_req, res) {
//     const sql = "SELECT * FROM borrowreq";

//     con.query(sql, function (err, results) {
//         if (err) {
//             res.status(500).send("Database server error");
//         }
//         else {
//             res.json(results);
//         }
//     });
// });

app.get("/history", async (req, res) => {
  const sql = `
      SELECT 
        Asset.Assetid, Asset.Assetimg, Asset.Assetname, Asset.Assetstatus, Asset.Staffaddid,
        BorrowReq.Borrowdate, BorrowReq.ReturnDate, BorrowReq.lectname,BorrowReq.Borrowname,BorrowReq.Status
      FROM Asset
      LEFT JOIN BorrowReq ON Asset.Assetid = BorrowReq.Assetid
    `;

  try {
    const [results] = await con.promise().query(sql);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error.");
  }
});

// ============ Page routes =================

// ------------ borrowing -----------

// -----------  approve -------------
app.get("/Approve", function (req, res) {
  res.sendFile(
    path.join(__dirname, "views/w1/See-the-borrowing-requests.html")
  );
});

// -----------  approve:id -------------

// -----------  Dashboard -------------
app.get("/Dashboard", function (req, res) {
  res.sendFile(path.join(__dirname, "views/w1/dashboard.html"));
});
// -----------  history -------------
app.get("/History", function (req, res) {
  res.sendFile(path.join(__dirname, "views/w1/"));
});
// ------------ root service ----------
app.get("/", function (req, res) {
  // if(req.session.role == 1) {
  //     res.redirect('/welcome');
  // }
  // else if(req.session.role == 2) {
  //     res.redirect('/shop');
  // }
  // else {
  //     res.sendFile(path.join(__dirname, 'views/login_template.html'));
  // }
  res.sendFile(
    path.join(__dirname, "views/w1/lec_history.html")
  );
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is runnint at port " + PORT);
});
