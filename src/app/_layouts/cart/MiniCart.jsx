"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const MiniCart = ({ isOpen }) => {
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    setCartDetails(
      localStorage.getItem("CART_LIST")
        ? JSON.parse(localStorage.getItem("CART_LIST"))
        : []
    );
  }, [isOpen]);
  
  return (
    <>
      <div className="sb-minicart-content">
        <div className="sb-ib-title-frame sb-mb-30">
          <h4>Your order.</h4>
          <i className="fas fa-arrow-down" />
        </div>
        {cartDetails.map((item, key) => (
          <Link
            href={`/product?id=${item?.id}`}
            className="sb-menu-item sb-menu-item-sm sb-mb-15"
            key={`mini-cart-item-${key}`}
          >
            <div className="sb-cover-frame">
              <img src={item.filesUrl} alt={item.name} />
            </div>
            <div className="sb-card-tp">
              <h4 className="sb-card-title">{item?.name}</h4>
              <div className="sb-price">
                <sub className="mb-2">LKR</sub> {" " + item?.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="sb-minicart-footer">
        {/* button */}
        <Link href="/cart" className="sb-btn sb-btn-gray sb-btn-text">
          <span>View order</span>
        </Link>
        {/* button end */}
        {/* button */}
        <Link href="/checkout" className="sb-btn sb-btn-text">
          <span>Checkout</span>
        </Link>
        {/* button end */}
      </div>
    </>
  );
};
export default MiniCart;
