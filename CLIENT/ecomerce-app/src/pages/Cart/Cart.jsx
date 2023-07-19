import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import { AiFillDelete } from "react-icons/ai";
import getCartItem from "../../api/user.api";
import "./Cart.css";
import { Link } from "react-router-dom";
import productAPI from "../../api/product.api";
import PaymentAPI from "../../api/payment.api";
import { useDispatch } from "react-redux";
import { updateState } from "../../redux/reduce/updateSlice";

const Cart = () => {
  const idUser = JSON.parse(localStorage.getItem("userLogin"))?._id;
  const [cartItems, setCartItems] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [subTotal, setSubtotal] = useState(0);
  const [isCheckoutSuccessful, setIsCheckoutSuccessful] = useState(false);
  const dispatch = useDispatch();

  // get api cart
  const getCartItems = async (idUser) => {
    const items = await getCartItem.getCartItem(idUser);
    if (items.length > 0) {
      const result = items.reduce((total, item) => {
        return total + item.idProduct.price * item.quantity;
      }, 0);
      setSubtotal(result);
    }
    console.log("123", items);
    setCartItems(items);
  };

  useEffect(() => {
    if (idUser) {
      getCartItems(idUser);
    }
  }, [idUser, isUpdate]);

  // Khởi tạo total / quantity
  const handleChange = async (e, productId) => {
    const newQty = parseInt(e.target.value, 10);
    console.log("Giá trị mới của input", newQty);
    try {
      await productAPI.updateQuantity(productId, { quantity: newQty });
      setIsUpdate(!isUpdate);
      // gọi Api để cập nhật số lượng sản phẩm với productId vs newQty
      // Sau khi API gọi thành công, cập nhật dữ liệu hiển thị
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm", error);
    }
    // const selectedItem = cartItems?.find((item) => item.idProduct._id === id);
  };

  // xóa trong sản phẩm trong cart
  const handleDelete = async (id) => {
    try {
      const response = await productAPI.deleteProductInCart(id);
      if (response) {
        setIsUpdate(!isUpdate);
        // Tạo một bản sao của danh sách sản phẩm
        const updatedCartItems = [...cartItems].filter(
          (item) => item._id !== id
        );
        // Cập nhật trạng thái với danh sách sản phẩm mới
        setCartItems(updatedCartItems);

        // Cập nhật lại tổng tiền (subtotal) sau khi xóa sản phẩm
        setSubtotal((prevSubtotal) => {
          const deletedItem = cartItems?.find((item) => item._id === id);
          return (
            prevSubtotal - deletedItem?.idProduct?.price * deletedItem?.quantity
          );
        });
        // Nếu danh sách sản phẩm mới là rỗng, tổng tiền sẽ là 0
        if (updatedCartItems.length === 0) {
          setSubtotal(0);
        }
      }
      dispatch(updateState(false));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm", error);
    }
  };

  // call api cart qua checkout
  const handlePostCheckout = async () => {
    try {
      if (cartItems.length > 0) {
        console.log(cartItems);
        const paymentData = {
          idUser: idUser,
          listProduct: cartItems,
          total: subTotal,
        };
        // await PaymentAPI.postCartToPayment(paymentData);
        await PaymentAPI.postCartToPayment(paymentData);
        await PaymentAPI.deleteCartToPayment(idUser);
        // Set checkout status to true and clear the cart
        setIsCheckoutSuccessful(true);
        setCartItems([]);
        setSubtotal(0);
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng", error);
    }
  };
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">PRODUCT</h4>
                <h4 className="cart-col-2">PRICE</h4>
                <h4 className="cart-col-3">QUANTITY</h4>
                <h4 className="cart-col-4">TOTAL</h4>
              </div>
              {/* product 1 */}
              {cartItems?.length > 0 &&
                cartItems?.map((items) => {
                  return (
                    <div
                      className="cart-data  py-3 mb-2 d-flex justify-content-between align-items-center"
                      key={items.idProduct._id}
                    >
                      <div className="cart-col-1 d-flex align-items-center gap-15">
                        <div className="w-25">
                          <img
                            src={items?.idProduct?.image}
                            className="img-fluid"
                            alt="product"
                          />
                        </div>
                        <div className="w-75">
                          <p>{items.idProduct.brand}</p>
                          <p>Size: 1</p>
                          <p>Color: Red</p>
                        </div>
                      </div>
                      <div className="cart-col-2 ">
                        <h5 className="price mb-0">
                          {items?.idProduct.price} $
                        </h5>
                      </div>
                      <div className="cart-col-3 d-flex align-items-center gap-15">
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            name=""
                            placeholder="0"
                            min={1}
                            max={15}
                            value={items.quantity}
                            onChange={(e) => handleChange(e, items._id)}
                          />
                        </div>
                        <div
                          onClick={() => handleDelete(items?.idProduct?._id)}
                        >
                          <AiFillDelete className="text-danger fs-4" />
                        </div>
                      </div>
                      <div className="cart-col-4 ">
                        <h5 className="price mb-0">
                          {items.idProduct.price * items.quantity} $
                        </h5>
                      </div>
                    </div>
                  );
                })}
              {/*  */}
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <div>
                    {" "}
                    <Link to="/product" className="button">
                      Continue to Shopping
                    </Link>
                  </div>

                  <div className="product-checkout d-flex flex-column align-items-start">
                    <h4>Subtotal: {subTotal.toFixed(2)}$</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                    <button className="button" onClick={handlePostCheckout}>
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
