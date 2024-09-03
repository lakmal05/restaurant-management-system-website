"use client";

import { useState, useEffect } from "react";

const ProductButtons = ({ productObject }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;
  const maxQuantity = 10;

  useEffect(() => {
    setCartTotal(
      localStorage.getItem("CART_LIST")
        ? JSON.parse(localStorage.getItem("CART_LIST")).length
        : 0
    );
  }, []);

  useEffect(() => {
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.classList.remove("sb-added");
  }, [productObject]);

  useEffect(() => {
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.innerHTML = cartTotal;
  }, [cartTotal]);

  const addToCart = (e) => {
    e.preventDefault();

    let details = localStorage.getItem("CART_LIST")
      ? JSON.parse(localStorage.getItem("CART_LIST"))
      : [];

    const fileUrl =
      productObject?.productFile?.length > 0
        ? productObject.productFile.find((img) => img.isDefault)?.file
            .originalPath
        : null;

    let productDetail = {
      id: productObject?.id,
      name: productObject?.name,
      status: productObject?.status,
      price: productObject?.price,
      filesUrl: fileUrl,
      description: productObject?.description,
      category: {
        id: productObject?.category?.id,
        name: productObject?.category?.name,
      },
      qty: quantity,
      total: productObject?.price * quantity,
    };

    console.log(productDetail);

    details.push(productDetail);

    localStorage.setItem("CART_LIST", JSON.stringify(details));

    const cartNumberEl = document.querySelector(".sb-cart-number");
    setCartTotal(cartTotal + quantity);

    cartNumberEl.classList.add("sb-added");
    e.currentTarget.classList.add("sb-added");

    setTimeout(() => {
      cartNumberEl.classList.remove("sb-added");
    }, 600);
  };

  return (
    <>
      <div className="sb-buttons-frame">
        <div className="sb-input-number-frame">
          <div
            className="sb-input-number-btn sb-sub"
            onClick={() =>
              setQuantity(quantity > minQuantity ? quantity - 1 : quantity)
            }
          >
            -
          </div>
          <input
            type="number"
            readOnly
            value={quantity}
            min={minQuantity}
            max={maxQuantity}
          />
          <div
            className="sb-input-number-btn sb-add"
            onClick={() =>
              setQuantity(quantity < maxQuantity ? quantity + 1 : quantity)
            }
          >
            +
          </div>
        </div>
        {/* button */}
        <a href="#." className="sb-btn sb-atc" onClick={(e) => addToCart(e)}>
          <span className="sb-icon">
            <img src="/img/ui/icons/cart.svg" alt="icon" />
          </span>
          <span className="sb-add-to-cart-text">Add to cart</span>
          <span className="sb-added-text">Added</span>
        </a>
        {/* button end */}
      </div>
    </>
  );
};
export default ProductButtons;
