"use client";

import { Formik } from "formik";
import AppData from "@data/app.json";
import { makeAdvancePayment } from "@/src/service/paymentService";
import { customToastMsg, handleError } from "@/src/util/CommonFun";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";

const CardDetailsForm = ({ getPaymentId, orderPayment }) => {
  const [cardDetails, setCardDetails] = useState([
    { name: "", cardNo: "", cvv: "", expDate: "" },
  ]);
  const [name, setName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cvv, setCvv] = useState("");
  const [expDate, setExpDate] = useState("");
  const [amount, setAmount] = useState("");

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    document.title = "Order checkout | Taste Budz Restaurant";

    const cart = localStorage.getItem("CART_LIST")
      ? JSON.parse(localStorage.getItem("CART_LIST"))
      : [];
    const total = cart.reduce((acc, item) => acc + item.total, 0);
    setCartTotal(total + 250);
  }, []);

  const makePayment = () => {
    let isValidated = false;
    if (name === "") {
      customToastMsg("Card name cannot be empty");
    } else if (cardNo === "") {
      customToastMsg("Card no cannot be empty");
    } else if (cvv === "") {
      customToastMsg("CVV cannot be empty");
    } else if (expDate === "") {
      customToastMsg("Expire date cannot be empty");
    } else if (!orderPayment && amount === "") {
      customToastMsg("Add advance payment amount");
    } else {
      isValidated = true;
    }

    if (isValidated) {
      // popUploader(dispatch, true);

      const data = {
        amount: orderPayment ? parseFloat(cartTotal) : parseFloat(amount),
        cardDetails: {
          name: name,
          cardNo: cardNo,
          cvv: cvv,
          expDate: expDate,
        },
      };

      makeAdvancePayment(data)
        .then((response) => {
          // popUploader(dispatch, false);
          customToastMsg("Payment added successfully", 1);
          const paymentId = response?.data?.id;
          console.log(response);
          console.log(paymentId);
          getPaymentId(paymentId);
          setCardDetails([{ name: "", cardNo: "", cvv: "", expDate: "" }]);
        })
        .catch((error) => {
          // popUploader(dispatch, false);
          handleError(error);
        });
    }
  };

  return (
    <form className="sb-checkout-form">
      <div className="sb-group-input">
        <input
          type="text"
          placeholder=" "
          name="name"
          required="required"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <span className="sb-bar"></span>
        <label>Name</label>
      </div>
      <div className="sb-group-input">
        <input
          type="number"
          placeholder=" "
          name="cardNo"
          required="required"
          onChange={(e) => {
            setCardNo(e.target.value);
          }}
          value={cardNo}
        />
        <span className="sb-bar"></span>
        <label>Card Number</label>
      </div>
      <div className="sb-group-input">
        <input
          type="number"
          placeholder=" "
          name="cvv"
          required="required"
          onChange={(e) => {
            setCvv(e.target.value);
          }}
          value={cvv}
        />
        <span className="sb-bar"></span>
        <label>CVV</label>
      </div>
      <div className="sb-group-input">
        <input
          type="month"
          placeholder=" "
          name="expDate"
          required="required"
          onChange={(e) => {
            setExpDate(e.target.value);
          }}
          value={expDate}
        />
        <span className="sb-bar"></span>
        <label>Expire date</label>
      </div>
      <div className="sb-group-input">
        <input
          type="number"
          placeholder=" "
          name="amount"
          disabled={orderPayment}
          required="required"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={orderPayment ? cartTotal : amount}
        />
        <span className="sb-bar"></span>
        {orderPayment ? <label>{cartTotal}</label> : <label>Amount</label>}{" "}
      </div>
      {/* button */}
      <button
        type="button"
        onClick={() => {
          makePayment();
        }}
        className="sb-btn sb-cf-submit sb-show-success"
      >
        <span className="sb-icon">
          <img src="/img/ui/icons/arrow.svg" alt="icon" />
        </span>
        <span>Make Payment</span>
      </button>
      {/* button end */}
    </form>
  );
};
export default CardDetailsForm;
