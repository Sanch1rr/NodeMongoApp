const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const mongoose = require("mongoose");

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
  console.log(reqBody.name);
  console.log(JSON.stringify(req.body.name));

  let newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  newUser
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Handling POST requests to /users",
        createdProduct: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: err,
      });
    });
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  Users.findOneAndDelete({
    _id: id,
  }).exec((err, post) => {
    if (err)
      return res.status(500).json({
        code: 500,
        message: "There was an error deleting the post",
        error: err,
      });
    res
      .status(200)
      .json({ code: 200, message: "Post deleted", deletedPost: post });
  });
});

router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };

  Users.findByIdAndUpdate(id, updatedUser, (err, updated) => {
    if (err) {
      res.json({
        updatedUser,
        success: false,
        msg: "Failed to update board",
      });
    } else {
      res.json({ updatedUser, success: true, msg: "Board added" });
    }
  });
});

module.exports = router;
