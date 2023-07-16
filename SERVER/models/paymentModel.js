const mongoose = require("mongoose"); // Erase if already required

const COLLECTION_NAME = "payments"; //bảng
const DOCUMENT_NAME = "payments"; // chỗ tham chiếu
// Declare the Schema of the Mongo model
var checkoutSchema = new mongoose.Schema(
  {
    idCart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      require: true,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      enum: [1, 2, 3],
      default: 1,
      required: true,
    },
    shippingAddress: {
      type: String,
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
