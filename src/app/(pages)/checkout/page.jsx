"use client";
import React, { useEffect, useState } from "react";
import PageBanner from "@components/PageBanner";
import CheckoutForm from "@components/forms/CheckoutForm";
import Link from "next/link";

const Checkout = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    document.title = "Order checkout | Taste Budz Restaurant";
    setCartDetails(
      localStorage.getItem("CART_LIST")
        ? JSON.parse(localStorage.getItem("CART_LIST"))
        : []
    );
  }, []);

  useEffect(() => {
    const total = cartDetails.reduce((acc, item) => acc + item.total, 0);
    setCartSubTotal(total);
    setCartTotal(total + 250);
  }, [cartDetails]);
  return (
    <>
      <PageBanner pageTitle={"Checkout"} breadTitle={"Checkout"} type={1} />

      {/* checkout */}
      <section className="sb-p-90-90">
        <div className="container" data-sticky-container>
          <div className="row">
            <div className="col-lg-8">
              <CheckoutForm />
            </div>
            <div
              id="checkoutFormStatus"
              className="sb-success-result"
              style={{ zIndex: 25 }}
            >
              <img
                src="/img/ui/success.jpg"
                alt="success"
                className="sb-mb-15"
                style={{ width: 400 }}
              />
              <div className="sb-success-title sb-mb-15">Success!</div>
              <p className="sb-text text-center sb-mb-15">
                Thank you for join with us!!
                <br />
                Your order has been placed <br />
                successfully
              </p>

              {/* button */}
              <Link href="/" className="sb-btn sb-btn-2">
                <span className="sb-icon">
                  <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                </span>
                <span>Back to home</span>
              </Link>
              {/* button end */}
            </div>
            <div className="col-lg-4">
              <div className="sb-pad-type-2 sb-sticky" data-margin-top="120">
                <div className="sb-co-cart-frame">
                  <div className="sb-cart-table">
                    <div className="sb-cart-table-header">
                      <div className="row">
                        <div className="col-lg-9">Product</div>
                        <div className="col-lg-3 text-right">Total</div>
                      </div>
                    </div>

                    {cartDetails.map((item, key) => (
                      <div className="sb-cart-item">
                        <div className="row align-items-center">
                          <div className="col-lg-9">
                            <Link
                              className="sb-product"
                              href={`/product?id=${item.id}`}
                            >
                              <div className="sb-cover-frame">
                                <img src={item.filesUrl} alt={item.name} />
                              </div>
                              <div className="sb-prod-description">
                                <h4 className="sb-mb-10">{item.name}</h4>
                                <p className="sb-text sb-text-sm">
                                  x{item.qty}
                                </p>
                              </div>
                            </Link>
                          </div>
                          <div className="col-lg-3 text-md-right">
                            <div className="sb-price-2">
                              <span>Total: </span>
                              LKR
                              {" " + item.total}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="sb-cart-total sb-cart-total-2">
                      <div className="sb-sum">
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Subtotal:</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-1 text-right">
                              LKR{" " + cartSubTotal}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Shipping :</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-1 text-right">
                              LKR{" " + 250}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sb-realy-sum">
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Total:</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-2 text-right">
                              LKR{" " + cartTotal}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* checkout end */}
    </>
  );
};
export default Checkout;
