const express = require("express");
const { createPayment } = require("../controller/paymentCtrl.js");
const router = express.Router();

router.post("/payment", createPayment);

module.exports = router;
