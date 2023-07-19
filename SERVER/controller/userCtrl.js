const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
var bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sceretKey = require("../config/jwtConfig");

// Create a User -- // isCheck

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
  const email = req.body.email;
  /**
   * TODO:With the help of email find the user exists or not
   */
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    /**
     * TODO:if user not found user create a new user
     */
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    /**
     * TODO:if user found then thow an error: User already exists
     */
    throw new Error("User Already Exists");
  }
});

// Login a user // isCheck

class loginUserCtrl {
  async handleLogin(req, res) {
    const { email, password } = req.body;
    // check if user exists or not
    try {
      const findUser = await User.findOne({ email });
      if (findUser) {
        const isPasswordMatched = await bcrypt.compare(
          password,
          findUser.password
        );
        if (isPasswordMatched) {
          const accessToken = jwt.sign(findUser.toJSON(), sceretKey);
          res.status(200).json({
            data: findUser,
            accessToken,
          });
        } else {
          res
            .status(401)
            .json({ message: "Thông tin tài khoản mật khẩu không chính xác " });
        }
      } else {
        res.status(401).json({ message: "Email does not exit " });
      }
    } catch (error) {
      res.status(500).json({ message: "Interval Server Error" });
    }
  }
}

// admin login // isCheck

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const findAdmin = await User.findOne({ email });
    if (findAdmin && findAdmin.role === "admin") {
      const isPasswordMatched = await bcrypt.compare(
        password,
        findAdmin.password
      );
      if (isPasswordMatched) {
        const accessToken = jwt.sign(findAdmin.toJSON(), sceretKey);
        res.status(200).json({
          data: findAdmin,
          accessToken,
        });
      } else {
        res
          .status(401)
          .json({ message: "Thông tin tài khoản mật khẩu không chính xác!" });
      }
    } else {
      res.status(401).json({ message: "Không có quyền truy cập" });
    }
  } catch (error) {
    res.status(500).json({ message: "Interval server error" });
  }
};

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users
const getallUser = async (req, res) => {
  try {
    const getUsers = await User.find({}); // Sử dụng hàm find để lấy tất cả
    res.status(200).json(getUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách người dùng", error });
  }
};

// Get a single user // ischeck

const getaUser = async (req, res) => {
  const { id } = req.params;

  try {
    const getaUser = await User.findById(id);
    if (getaUser) {
      res.status(200).json(getaUser);
    } else {
      res.status(404).json({ message: "Không tìm thầy ID người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy người dùng " });
  }
};

// delete a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// block user // is check
const blockUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    mobile,
    password,
    role,
    isBlocked,
    address,
  } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        lastname,
        email,
        mobile,
        password,
        role,
        isBlocked,
        address,
      },
      {
        new: true,
      }
    );
    console.log("update", updateUser);
    if (updateUser) {
      //Nếu không tìm thấy người dùng với _id cụ thể , trả về thông báo lỗi
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật người dùng" });
  }
};

// search user // is check
const searchUser = async (req, res) => {
  const { lastname } = req.body; // Giả sử bạn muốn tìm kiếm người dùng theo username, và client gửi thông tin qua query parameter.
  console.log(lastname);
  try {
    // Thực hiện tìm kiếm người dùng trong cơ sở dữ liệu

    const user = await User.find({
      lastname: { $regex: lastname, $options: "i" },
    });
    if (!user) {
      // Nếu không tìm thấy người dùng, trả về thông báo lỗi hoặc mã lỗi tùy ý
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    // Nếu tìm thấy, trả về thông tin người dùng trong phản hồi
    return res.status(200).json(user);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Lỗi khi tìm kiếm người dùng:", error);
    return res.status(500).json({ error: "Đã xảy ra lỗi server" });
  }
};

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    // sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Add to card // isCheck
const userCart = asyncHandler(async (req, res) => {
  const { idProduct, idUser } = req.body;
  console.log(req.body);
  try {
    const cartItem = await Cart.findOne({
      idUser: idUser,
      idProduct: idProduct,
    }).populate("idProduct");
    if (cartItem) {
      cartItem.quantity += 1; // Tăng số lượng lên 1
      await cartItem.save();
      res.status(200).json({
        msg: "Sản phẩm đã tồn tại trong giỏ hàng và số lượng đã được tăng  lên 1",
      });
    } else {
      // Nếu chưa tồn tại , thêm nó vào giỏ hàng
      const newCartItem = new Cart({
        idUser: idUser,
        idProduct: idProduct,
        quantity: 1, // Đặt số lượng ban đầu là 1
      });
      await newCartItem.save();
      res.status(200).json({ msg: "Đã thêm thành công" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
});

// Delete Product to Cart // isCheck
const deleteCartItem = async (req, res) => {
  const idProduct = req.params.id;
  try {
    const deletedItem = await Cart.findOneAndDelete({ idProduct });
    if (deletedItem) {
      res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy mục trong giỏ hàng" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

// get product cart // isCheck
const getCartItem = async (req, res) => {
  const idUser = req.params.id;
  console.log(idUser);
  try {
    const cartItems = await Cart.find({ idUser }).populate("idProduct");
    if (cartItems.length > 0) {
      res.status(200).json(cartItems);
    } else {
      res.status(200).json({ msg: "Giỏ hàng trống" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Quantity CartItem // isCheck
const updateCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newQuantity = Number(req.body.quantity);
  console.log(2222, req.body.quantity);
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: id },
      { quantity: newQuantity }
    );

    if (!updatedCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res.status(200).json({ msg: "Update successfully" });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
  }
});

module.exports = {
  createUser,
  loginUserCtrl: new loginUserCtrl(),
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
  deleteCartItem,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  updateCartItem,
  searchUser,
};
