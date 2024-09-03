"use client";
import { useEffect, useState } from "react";
import CardDetailsForm from "./CardDetailsForm";
import { placeOrder } from "@/src/service/reservationService";
import {
  customToastMsg,
  handleError,
  validateInputs,
} from "@/src/util/CommonFun";

const CheckoutForm = () => {
  const [cartTotal, setCartTotal] = useState(0);

  const [customerDetails, setCustomerDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [orderData, setOrderData] = useState({});
  const [isShowPaymentForm, setIsShowPaymentForm] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [orderProductsList, setOrderProductsList] = useState([]);

  useEffect(() => {
    setCustomerDetails(
      localStorage.getItem("CUSTOMER")
        ? JSON.parse(localStorage.getItem("CUSTOMER"))
        : {}
    );
    setOrderProductsList(
      localStorage.getItem("CART_LIST")
        ? JSON.parse(localStorage.getItem("CART_LIST"))
        : []
    );
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
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.classList.remove("sb-added");
  }, [firstName]);

  const checkLoginCustomer = () => {
    if (localStorage.getItem("CUSTOMER")) {
      handlePlaceOrder();
    } else {
      customToastMsg("You have to login before place order");
    }
  };

  const handlePlaceOrder = async () => {
    let isValidated = false;
    console.log(orderProductsList);

    if (orderProductsList.length === 0) {
      customToastMsg("First add some products to cart");
    } else if (address === "") {
      customToastMsg("Address cannot be empty");
    } else if (selectedPaymentMethod === "") {
      customToastMsg("Select payment method");
    } else {
      isValidated = true;
    }
    if (isValidated) {
      const cartDetails = localStorage.getItem("CART_LIST")
        ? JSON.parse(localStorage.getItem("CART_LIST"))
        : [];
      const subTotal = cartDetails.reduce((acc, item) => acc + item.total, 0);
      const total = subTotal + 250;
      const newArray = orderProductsList.map((item) => ({
        id: item.id,
        qty: parseFloat(item.qty),
      }));

      const data = {
        paymentType: selectedPaymentMethod,
        subTotal: parseFloat(total),
        description: orderNote,
        userId: customerDetails?.id,
        orderItems: newArray,
        firstName: customerDetails?.firstName,
        lastName: customerDetails?.lastName,
        contactNo: customerDetails?.customer?.contactNo,
        email: customerDetails?.email,
        addressLine: address,
        orderType: "DELIVERY",
        paymentId: "",
      };

      setOrderData(data);

      if (selectedPaymentMethod === "CASH_ON_DELIVERY") {
        await handlePaymentSuccess(data);
      } else if (selectedPaymentMethod === "ONLINE_PAYMENT") {
        setIsShowPaymentForm(true);
      }
    }
  };

  const setPaymentIdToOrderObject = async (paymentId) => {
    const updatedOrderData = {
      ...orderData,
      paymentId: paymentId,
    };
    await handlePaymentSuccess(updatedOrderData);
  };

  const handlePaymentSuccess = (orderDetailsObject) => {
    const form = document.getElementById("checkoutForm");
    const status = document.getElementById("checkoutFormStatus");

    console.log(orderDetailsObject);

    // popUploader(dispatch, true);
    placeOrder(orderDetailsObject)
      .then((response) => {
        // popUploader(dispatch, false);
        customToastMsg(
          "Thanks for shop with us, your order placed successfully",
          1
        );
        status.style.opacity = "1";
        status.style.pointerEvents = "auto";
        setFirstName("");
        setLastName("");
        setContactNo("");
        setEmail("");
        setAddress("");
        setOrderNote(0);
        setSelectedPaymentMethod("");

        localStorage.removeItem("CART_LIST");
        const cartNumberEl = document.querySelector(".sb-cart-number");
        setCartTotal(0);
        cartNumberEl.classList.add("sb-added");
      })
      .catch((error) => {
        // popUploader(dispatch, false);
        console.log(error);
        handleError(error);
      })
      .finally(() => {
        setIsShowPaymentForm(false);
      });
  };

  return (
    <>
      {/* contact form */}
      {isShowPaymentForm ? (
        <CardDetailsForm
          orderPayment={true}
          getPaymentId={async (paymentId) => {
            if (paymentId) {
              console.log(paymentId);
              setPaymentId(paymentId);
              await setPaymentIdToOrderObject(paymentId);
            } else {
              setIsShowPaymentForm(false);
            }
          }}
        />
      ) : (
        <form id="checkoutForm" className="sb-checkout-form">
          <div className="sb-mb-30">
            <h3>Shipping Details</h3>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="text"
                  disabled={true}
                  value={customerDetails?.firstName}
                />
                <span className="sb-bar"></span>
                {Object.keys(customerDetails).length === 0 && (
                  <label>First Name</label>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="text"
                  disabled={true}
                  value={customerDetails?.lastName}
                />
                <span className="sb-bar"></span>
                {Object.keys(customerDetails).length === 0 && (
                  <label>Last Name</label>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="text"
                  placeholder=" "
                  name="address"
                  required="required"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                />
                <span className="sb-bar"></span>
                <label>Address</label>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="number"
                  disabled={true}
                  value={customerDetails?.customer?.contactNo}
                />
                <span className="sb-bar"></span>
                {Object.keys(customerDetails).length === 0 && (
                  <label>Contact No</label>
                )}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="sb-group-input">
                <input
                  type="email"
                  disabled={true}
                  value={customerDetails?.email}
                />
                <span className="sb-bar"></span>
                {Object.keys(customerDetails).length === 0 && (
                  <label>Email</label>
                )}
              </div>
            </div>
          </div>
          <div className="sb-mb-30">
            <h3>Additional information</h3>
          </div>
          <div className="sb-group-input">
            <textarea
              placeholder=" "
              name="message"
              onChange={(e) => {
                setOrderNote(e.target.value);
              }}
              value={orderNote}
            />
            <span className="sb-bar"></span>
            <label>Order notes</label>
          </div>
          <div className="sb-mb-30">
            <h3 className="sb-mb-30">Payment method</h3>
            <ul>
              <li className="sb-radio">
                <input
                  type="radio"
                  id="option-1"
                  name="payment_method"
                  value="ONLINE_PAYMENT"
                  onChange={(e) => {
                    setSelectedPaymentMethod(e.target.value);
                  }}
                />
                <label htmlFor="option-1">Online Payment</label>
                <div className="sb-check"></div>
              </li>

              <li className="sb-radio">
                <input
                  type="radio"
                  id="option-3"
                  name="payment_method"
                  value="CASH_ON_DELIVERY"
                  onChange={(e) => {
                    setSelectedPaymentMethod(e.target.value);
                  }}
                />
                <label htmlFor="option-3">Cash on delivery</label>
                <div className="sb-check"></div>
              </li>
            </ul>
          </div>
          {/* button */}
          <button
            type="button"
            className="sb-btn sb-m-0"
            onClick={() => {
              checkLoginCustomer();
            }}
          >
            <span className="sb-icon">
              <img src="/img/ui/icons/arrow.svg" alt="icon" />
            </span>
            <span>Place order</span>
          </button>
          {/* button end */}
        </form>
      )}
      {/* contact form end */}
    </>
  );
};
export default CheckoutForm;
