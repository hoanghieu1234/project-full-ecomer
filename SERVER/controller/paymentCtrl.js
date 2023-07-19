const paymentInModel = require("../models/paymentModel");
const cartModel = require("../models/cartModel");

async function createPayment(req, res) {
  try {
    const { idUser, listProduct, total } = req.body;

    // Kiểm tra các trường cần thiết đã được cung cập hay chưa
    if (!idUser || !listProduct || !total) {
      return res
        .status(400)
        .json({ errors: "Vui lòng cung cấp đầy đủ thông tin" });
    }
    // Tạo 1 payment mới
    const newPayment = new paymentInModel({
      idUser,
      listProduct,
      total,
    });

    // Lưu vào cơ sở dữ liệu
    const savePayment = await newPayment.save();

    // Trả về mã thanh toán
    res.status(200).json(savePayment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not create payment" });
  }
}

// get payment
async function getPayment(req, res) {
  try {
    // Lấy tất cả các thanh toán từ cơ sở dữ liệu
    const payments = await paymentInModel.find().populate("idUser"); // Sử dụng phương thức find() để lấy tất cả thanh toán
    console.log("is", payments);
    // Trả về danh sách thanh toán
    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not get payments", error: error.message });
  }
}

async function deleteCart(req, res) {
  const idUser = req.params.id;
  console.log("idUser", idUser);
  try {
    // Delete all payments from the database
    await cartModel.deleteMany({ idUser });
    // Return success response
    res.status(200).json({ message: "All cart deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not delete payments", error: error.message });
  }
}

module.exports = {
  createPayment,
  getPayment,
  deleteCart,
};
