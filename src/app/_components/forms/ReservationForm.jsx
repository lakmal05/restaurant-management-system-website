"use client";

import { placeReservation } from "@/src/service/reservationService";
import { Input } from "reactstrap";
import { useEffect, useState } from "react";
import {
  customToastMsg,
  handleError,
  validateInputs,
} from "@/src/util/CommonFun";
import { getAllBranches } from "@/src/service/branchService";
import CardDetailsForm from "./CardDetailsForm";

const ReservationForm = () => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [branchList, setBranchList] = useState([]);
  const [paymentId, setPaymentId] = useState("");
  const [reservationData, setReservationData] = useState({});
  const [isShowPaymentForm, setIsShowPaymentForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [personCount, setPersonCount] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState("");

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  useEffect(() => {
    loadAllBranches();
    setCustomerDetails(
      localStorage.getItem("CUSTOMER")
        ? JSON.parse(localStorage.getItem("CUSTOMER"))
        : {}
    );
  }, []);

  const loadAllBranches = () => {
    // popUploader(dispatch, true);
    setBranchList([]);
    let temp = [];
    getAllBranches()
      .then((res) => {
        res?.data?.records.map((branch) => {
          temp.push({
            id: branch?.id,
            name: branch?.name,
          });
        });
        setBranchList(temp);
        // popUploader(dispatch, false);
      })
      .catch((err) => {
        // popUploader(dispatch, false);
        handleError(err);
      });
  };

  const checkLoginCustomer = () => {
    console.log(localStorage.getItem("CUSTOMER"));

    if (localStorage.getItem("CUSTOMER")) {
      handleSubmitReservation();
    } else {
      customToastMsg("You have to login before make a reservation");
    }
  };

  const handleSubmitReservation = () => {
    let isValidated = false;
    if (selectDate === "") {
      customToastMsg("Select reservation date");
    } else if (selectTime === "") {
      customToastMsg("Select reservation time");
    } else if (personCount === 0) {
      customToastMsg("Add person count");
    } else if (selectedBranch === "") {
      customToastMsg("Select branch");
    } else {
      isValidated = true;
    }
    if (isValidated) {
      const data = {
        userId: customerDetails?.id,
        name: customerDetails?.firstName + " " + customerDetails?.lastName,
        branchId: selectedBranch,
        email: customerDetails?.email,
        personCount: parseFloat(personCount),
        contactNo: customerDetails?.customer?.contactNo,
        date: selectDate,
        time: selectTime,
      };

      console.log(data);

      setReservationData(data);
      setIsShowPaymentForm(true);
    }
  };

  const handlePaymentSuccess = (paymentId) => {
    console.log("in");

    const form = document.getElementById("reservationForm");
    const status = document.getElementById("reservationFormStatus");

    const updatedReservationData = {
      ...reservationData,
      paymentId: paymentId,
    };

    console.log(updatedReservationData);

    // popUploader(dispatch, true);
    placeReservation(updatedReservationData)
      .then((response) => {
        // popUploader(dispatch, false);

        status.style.opacity = "1";
        status.style.pointerEvents = "auto";
        setName("");
        setEmail("");
        setContactNo("");
        setSelectDate("");
        setSelectTime("");
        setPersonCount(0);
        setSelectedBranch("");
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
          orderPayment={false}
          getPaymentId={async (paymentId) => {
            if (paymentId) {
              setPaymentId(paymentId);
              await handlePaymentSuccess(paymentId);
            } else {
              setIsShowPaymentForm(false);
            }
          }}
        />
      ) : (
        <form id="reservationForm">
          <div className="row">
            <div className="col-lg-12">
              <div className="sb-group-input">
                <input
                  type="text"
                  value={
                    customerDetails?.firstName
                      ? customerDetails?.firstName +
                        " " +
                        customerDetails?.lastName
                      : ""
                  }
                  disabled={true}
                />
                <span className="sb-bar"></span>
                {Object.keys(customerDetails).length === 0 && (
                  <label>Name</label>
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
            <div className="col-lg-12">
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
                  type="date"
                  placeholder=" "
                  name="date"
                  min={today}
                  required="required"
                  onChange={(e) => {
                    setSelectDate(e.target.value);
                  }}
                  value={selectDate}
                />
                <span className="sb-bar"></span>
                <label>Date</label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="sb-group-input">
                <input
                  type="time"
                  placeholder=" "
                  name="time"
                  required="required"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSelectTime(e.target.value);
                  }}
                  value={selectTime}
                />
                <span className="sb-bar"></span>
                <label>Time</label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="sb-group-input">
                <input
                  type="number"
                  placeholder=" "
                  name="person"
                  required="required"
                  onChange={(e) => {
                    setPersonCount(e.target.value);
                  }}
                  value={personCount}
                  min={1}
                  max={8}
                />
                <span className="sb-bar"></span>
                <label>Person</label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="sb-group-input">
                <Input
                  className="select-input"
                  id="exampleSelect"
                  name="branch"
                  type="select"
                  required="required"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSelectedBranch(e.target.value);
                  }}
                  value={selectedBranch}
                >
                  <option>Select Branch</option>
                  {branchList.map((branch) => {
                    return <option value={branch?.id}>{branch?.name}</option>;
                  })}
                </Input>

                <span className="sb-bar"></span>
              </div>
            </div>
          </div>

          {/* button */}
          <button
            type="button"
            onClick={() => {
              checkLoginCustomer();
            }}
            className="sb-btn sb-cf-submit sb-show-success"
          >
            <span className="sb-icon">
              <img src="/img/ui/icons/arrow.svg" alt="icon" />
            </span>
            <span>Reserve</span>
          </button>
          {/* button end */}
        </form>
      )}

      {/* contact form end */}
    </>
  );
};
export default ReservationForm;
