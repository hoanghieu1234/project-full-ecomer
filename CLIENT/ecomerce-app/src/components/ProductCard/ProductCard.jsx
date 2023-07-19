import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useParams } from "react-router-dom";
import productAPI from "../../api/product.api";
import "./ProductCard.css";

const ProductCard = (props) => {
  let location = useLocation();
  const { grid } = props;
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    // Gọi API và lấy dữ liệu từ server
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProducts();
        console.log(response);
        setProducts(response);
      } catch (error) {
        console.error("Lỗi khi gọi API: " + error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      {products?.map((product) => (
        <div
          className={`${
            location.pathname == "/store" ? `gr-${grid}` : "col-3"
          }`}
          key={product._id}
        >
          <Link
            to={`/product/${product._id}`}
            className="product-card position-relative"
          >
            <div className="wishlist-icon position-absolute">
              <Link>
                <img src="images/wish.svg" alt="wishlist" />
              </Link>
            </div>
            <div className="product-image">
              <img
                src={product.image}
                // src="https://www.w3schools.com/tags/img_girl.jpg"
                alt="product image"
                className="img-fluid"
              />
              <img
                src="images/watch-1.jpeg"
                alt="product image"
                className="img-fluid"
              />
            </div>
            <div className="product-details">
              <h6 className="brand">{product.brand}</h6>
              <h5 className="product-title">{product.title}</h5>
              {/* Thư việc reactStars */}
              <ReactStars
                count={5}
                size={24}
                value={3}
                edit={false} // Dòng này ngăn ko cho sữa
                activeColor="#ffd700"
              />
              <p
                className={`description ${grid === 12 ? "d-block" : "d-none"}`}
              >
                {product.description}
              </p>
              <p className="price">{product.price} $</p>
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">
                <Link>
                  <img src="images/prodcompare.svg" alt="addcart" />
                </Link>
                <Link>
                  <img src="images/view.svg" alt="addcart" />
                </Link>
                <Link>
                  <img src="images/add-cart.svg" alt="addcart" />
                </Link>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
