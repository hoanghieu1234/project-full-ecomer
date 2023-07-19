const mongoose = require("mongoose"); // Erase if already required

const COLLECTION_NAME = "payments"; //bảng
const DOCUMENT_NAME = "payments"; // chỗ tham chiếu
// Declare the Schema of the Mongo model
const checkoutSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    listProduct: {
      type: [],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, checkoutSchema);
