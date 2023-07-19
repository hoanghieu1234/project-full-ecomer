const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getCartItem,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteCartItem,
  updateCartItem,
  searchUser,
} = require("../controller/userCtrl");
const checkAuthentication = require("../middlewares/checkAuthen.midleware");
const router = express.Router();
router.post("/register", createUser); // isCheck
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", updatePassword);
router.post("/login", loginUserCtrl.handleLogin); // isCheck
router.post("/admin-login", loginAdmin); // isCheck
router.post("/cart", userCart); // isCheck
router.post("/cart/applycoupon", applyCoupon);
router.post("/cart/cash-order", createOrder);
router.get("/all-users", getallUser); // is check
router.get("/get-orders", getOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", getWishlist);
router.get("/cart/:id", getCartItem); // isCheck
router.delete("/cart/:id", checkAuthentication, deleteCartItem); // isCheck
router.put("/cart/quantity/:id", updateCartItem); // isCheck
router.post("/search", searchUser);

router.get("/:id", getaUser); // isCheck
router.delete("/empty-cart", emptyCart);
router.delete("/:id", deleteaUser);
router.put(
  "/order/update-order/:id",

  updateOrderStatus
);

router.put("/edit-user", updatedUser);
router.put("/save-address", saveAddress);
router.patch("/block-user/:id", blockUser);

module.exports = router;
