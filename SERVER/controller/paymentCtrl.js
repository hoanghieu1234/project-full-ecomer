const paymentInModel = require("../models/paymentModel");

async function createPayment(req, res) {
  try {
    const { idCart, idUser, shippingAddress, status } = req.body;

    //  Tiếp tục xử lý thanh toán
    const newPayment = await paymentInModel.create({
      idCart,
      idUser,
      shippingAddress,
      status,
    });
    return res.status(201).json(newPayment);
  } catch (error) {
    return res.status(500).json({ error: "Could not create payment" });
  }
}

module.exports = {
  createPayment,
};
