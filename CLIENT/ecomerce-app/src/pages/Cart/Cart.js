import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import { storeImage } from "../../assets/images";
import { AiFillDelete } from "react-icons/ai";
import getCartItem from "../../api/user.api";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const idUser = JSON.parse(localStorage.getItem("userLogin"))?._id;
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState();
  const [itemProduct, setItemProduct] = useState();

  const getCartItems = async (idUser) => {
    const items = await getCartItem.getCartItem(idUser);
    console.log("123", items);
    setCartItems(items);
  };

  useEffect(() => {
    getCartItems(idUser);
  }, [idUser]);

  // Khởi tạo total
  let subTotal = 0;
  let total = 0;

  const handleChange = (e, id) => {
    console.log(11111, id);

    cartItems?.map((item) => {
      console.log("item", item.idProduct._id);
      if (item.idProduct._id == id) {
        setQty(e.target.value);
      } else {
        console.log(122222);
      }
    });
    console.log(11111, qty);

    // setQty(id);
    // setCartItems((prevItems) => ({
    //   ...prevItems,
    //   quantity: value,
    // }));
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
                    <div className="cart-data  py-3 mb-2 d-flex justify-content-between align-items-center">
                      <div className="cart-col-1 d-flex align-items-center gap-15">
                        <div className="w-25">
                          <img
                            src={items?.idProduct?.images[0]?.url}
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
                        <h5 className="price mb-0">{items.idProduct.price}</h5>
                      </div>
                      <div className="cart-col-3 d-flex align-items-center gap-15">
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            name=""
                            // min={1}
                            // max={10}
                            id=""
                            value={qty}
                            onChange={(e) =>
                              handleChange(e, items.idProduct._id)
                            }
                          />
                        </div>
                        <div>
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
                    <h4>Subtotal: {subTotal} $</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Link to="/checkout" className="button">
                      Checkout
                    </Link>
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
