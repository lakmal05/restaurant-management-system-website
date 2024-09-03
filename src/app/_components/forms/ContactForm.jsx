"use client";

import { Formik } from "formik";
import AppData from "@data/app.json";
import { useEffect, useState } from "react";
import { sendInquiry } from "@/src/service/inquiryService";
import { handleError } from "@/src/util/CommonFun";

const ContactForm = () => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCustomerDetails(
      localStorage.getItem("CUSTOMER")
        ? JSON.parse(localStorage.getItem("CUSTOMER"))
        : {}
    );
  }, []);

  const checkLoginCustomer = () => {
    console.log(localStorage.getItem("CUSTOMER"));

    if (localStorage.getItem("CUSTOMER")) {
      handleSubmitInquiry();
    } else {
      customToastMsg("You have to login before send an inquiry");
    }
  };

  const handleSubmitInquiry = () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactFormStatus");

    let isValidated = false;
    if (message === "") {
      customToastMsg("Message cannot be empty");
    } else {
      isValidated = true;
    }

    if (isValidated) {
      const data = {
        email: customerDetails.email,
        message: message,
      };

      console.log(data);

      sendInquiry(data)
        .then((response) => {
          // popUploader(dispatch, false);
          status.style.opacity = "1";
          status.style.pointerEvents = "auto";
          setMessage("");
        })
        .catch((error) => {
          // popUploader(dispatch, false);
          handleError(error);
        });
    }
  };

  return (
    <>
      {/* contact form */}
      <form id="contactForm">
        <div className="sb-group-input">
          <input
            type="text"
            placeholder=" "
            name="name"
            required="required"
            disabled={true}
            value={
              customerDetails.firstName
                ? customerDetails.firstName + " " + customerDetails.lastName
                : ""
            }
          />
          <span className="sb-bar"></span>
          {Object.keys(customerDetails).length === 0 && <label>Name</label>}
        </div>
        <div className="sb-group-input">
          <input
            type="email"
            placeholder=" "
            name="email"
            required="required"
            disabled={true}
            value={customerDetails.email}
          />
          <span className="sb-bar"></span>

          {Object.keys(customerDetails).length === 0 && <label>Email</label>}
        </div>
        <div className="sb-group-input">
          <textarea
            placeholder=" "
            name="message"
            required="required"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <span className="sb-bar"></span>
          <label>Message</label>
        </div>
        <p className="sb-text sb-text-xs sb-mb-30">
          *We promise not to disclose your <br />
          personal information to third parties.
        </p>

        {/* button */}
        <button
          type="button"
          className="sb-btn sb-cf-submit sb-show-success"
          onClick={() => {
            checkLoginCustomer();
          }}
        >
          <span className="sb-icon">
            <img src="/img/ui/icons/arrow.svg" alt="icon" />
          </span>
          <span>Send</span>
        </button>
        {/* button end */}
      </form>

      {/* contact form end */}
    </>
  );
};
export default ContactForm;
