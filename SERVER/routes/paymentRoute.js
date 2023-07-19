const express = require("express");
const {
  createPayment,
  getPayment,
  deleteCart,
} = require("../controller/paymentCtrl.js");
const router = express.Router();

router.post("/", createPayment);
router.get("/", getPayment);
router.delete("/:id", deleteCart);

module.exports = router;
