const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controller/productCtrl");
const router = express.Router();
const upload = require("../middlewares/upLoadMulter");

router.post("/image", upload.upload.single("image"), (req, res, next) => {
  const urlPath =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

  return res.status(200).json({ image: urlPath });
});

router.post("/", createProduct);

router.get("/:id", getaProduct);
router.put("/wishlist", addToWishlist);
router.put("/rating", rating);

router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.get("/", getAllProduct);

module.exports = router;
