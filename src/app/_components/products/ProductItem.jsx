"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import { truncateDescription } from "@/src/util/CommonFun";

const ProductItem = ({ item, index, marginBottom, moreType }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setCartTotal(
      localStorage.getItem("CART_LIST")
        ? JSON.parse(localStorage.getItem("CART_LIST")).length
        : 0
    );
  }, [item]);

  useEffect(() => {
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.innerHTML = cartTotal;
  }, [cartTotal]);

  useEffect(() => {
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.classList.remove("sb-added");
  }, [quantity]);

  const addToCart = (e) => {
    e.preventDefault();
    let details = localStorage.getItem("CART_LIST")
      ? JSON.parse(localStorage.getItem("CART_LIST"))
      : [];

    const fileUrl =
      item?.files?.length > 0
        ? item.files.find((img) => img.isDeafult).originalPath
        : null;

    let productDetail = {
      id: item?.id,
      name: item?.name,
      status: item?.status,
      price: item?.price,
      filesUrl: fileUrl,
      description: item?.description,
      category: {
        id: item?.category?.id,
        name: item?.category?.name,
      },
      qty: quantity,
      total: item?.price * quantity,
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
      <div className={`sb-menu-item sb-mb-${marginBottom}`}>
        <Link href={`/product?id=${item.id}`} className="sb-cover-frame">
          {item?.files && item.files.length > 0 ? (
            item.files.map((img, index) => {
              if (img?.isDeafult) {
                return (
                  <img
                    src={img?.originalPath}
                    alt={item.name}
                    onError={(e) =>
                      (e.target.src =
                        "https://i.ibb.co/qpB9ZCZ/placeholder.png")
                    }
                  />
                );
              }
            })
          ) : (
            <img
              src="https://i.ibb.co/qpB9ZCZ/placeholder.png"
              alt="placeholder"
            />
          )}

          <div dangerouslySetInnerHTML={{ __html: item.badge }} />
        </Link>
        <div className="sb-card-tp">
          <h4 className="sb-card-title">{item.name}</h4>
          <div className="sb-price">
            <sub className="mb-2">LKR</sub> {item.price}
          </div>
        </div>
        <div className="sb-description">
          <p className="sb-text sb-mb-15">
            {parse(truncateDescription(item.description, 20))}
          </p>
        </div>
        <div className="sb-card-buttons-frame">
          {/* button */}
          {moreType != 2 ? (
            <Link
              href={`/product?id=${item.id}`}
              className="sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0"
            >
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
            </Link>
          ) : (
            <Link
              href={`/product?id=${item.id}`}
              className="sb-btn sb-btn-gray"
            >
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
              <span>Details</span>
            </Link>
          )}
          {/* button end */}
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
      </div>
    </>
  );
};
export default ProductItem;
