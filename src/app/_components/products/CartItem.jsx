"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import parse from "html-react-parser";

const CartItem = ({ item, key }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(item.qty);
  const [total, setTotal] = useState((item.price * item.qty).toFixed(2));

  useEffect(() => {
    setCartTotal(
      localStorage.getItem("CART_LIST")
        ? JSON.parse(localStorage.getItem("CART_LIST")).length
        : 0
    );
  }, []);

  useEffect(() => {
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.innerHTML = cartTotal;
  }, [cartTotal]);

  useEffect(() => {
    setTotal((quantity * item.price).toFixed(2));
  }, [quantity]);

  const removeFromCart = (e, key, itemId) => {
    e.preventDefault();
    const cartNumberEl = document.querySelector(".sb-cart-number");
    setCartTotal(cartTotal - quantity);

    cartNumberEl.classList.add("sb-added");

    setTimeout(() => {
      cartNumberEl.classList.remove("sb-added");
      document.querySelector(".sb-cart-item-" + key).remove();
    }, 600);
    let cartDetails = localStorage.getItem("CART_LIST")
      ? JSON.parse(localStorage.getItem("CART_LIST"))
      : [];

    const itemIndex = cartDetails.findIndex((item) => item.id === itemId);

    if (itemIndex > -1) {
      cartDetails.splice(itemIndex, 1);
    }

    localStorage.setItem("CART_LIST", JSON.stringify(cartDetails));
    window.location.reload();
  };

  return (
    <>
      <div className={`sb-cart-item sb-cart-item-${key}`}>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <Link className="sb-product" href={`/product?id=${item.id}`}>
              <div className="sb-cover-frame">
                <img src={item.filesUrl} alt={item.name} />
              </div>
              <div className="sb-prod-description">
                <h4 className="media-heading sb-mb-10">{item?.name}</h4>
                <p className="sb-text sb-text-sm">{parse(item.description)}</p>
              </div>
            </Link>
          </div>
          <div className="col-6 col-lg-3">
            <div className="sb-input-number-frame">
              <input type="number" value={quantity} readOnly />
            </div>
          </div>
          <div className="col-3 col-lg-1">
            <div className="sb-price-1">
              <span>Price: </span>
              LKR
              {" " + item.price}
            </div>
          </div>
          <div className="col-3 col-lg-1">
            <div className="sb-price-2">
              <span>Total: </span>
              LKR
              {" " + total}
            </div>
          </div>
          <div className="col-1">
            <a
              href="#."
              className="sb-remove"
              onClick={(e) => removeFromCart(e, key, item.id)}
            >
              +
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartItem;
