const express = require("express");
const router = express.Router();
const Users = require("../models/users");

router.get("/users", (req, res) => {
  Users.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({
        data: data,
      });
    }
  });
  //   res.send({
  //     data: "HELOO",
  //   });
});

router.post("/users", (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);

  let newUser = new Users(req.body);
  newUser
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  res.send("Seucces");
});

module.exports = router;
