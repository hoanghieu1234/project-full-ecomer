const mongoose = require("mongoose"); // Erase if already required

const COLLECTION_NAME = "carts"; //bảng
const DOCUMENT_NAME = "carts";
// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    idProduct: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: { type: mongoose.Schema.Types.Number, require: true, default: 1 },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, cartSchema);
