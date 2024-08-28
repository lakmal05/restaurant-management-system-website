import { AlertTriangle, Check, X } from "react-feather";
import { Slide, toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import * as constant from "../util/constants";

export const validateInputs = (inputValue, validationTopics) => {
  // Define validation functions for each topic
  const validationFunctions = {
    isEmpty: (value) => !value.trim(),
    isEmail: (value) =>
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    isPasswordValid: (value) => value.length < 8, // Adjust this according to your password validation criteria
  };

  // Define error messages for each topic
  const errorMessages = {
    isEmpty: "This field cannot be empty",
    isEmail: "Please enter a valid email address",
    isPasswordValid: "Password must be at least 8 characters long", // Adjust this according to your password validation criteria
  };

  for (const topic of validationTopics) {
    const validationFunction = validationFunctions[topic];
    const errorMessage = errorMessages[topic];
    if (validationFunction && validationFunction(inputValue)) {
      return { errorMessage, isValid: false }; // Validation failed, return error message and status
    }
  }

  return { errorMessage: null, isValid: true };
};

export const customSweetAlert = (
  text,
  type,
  buttonEvent,
  textInputProps,
  title
) => {
  let msgType = "warning";
  if (type === 2) {
    msgType = "info";
  } else if (type === 0) {
    msgType = "error";
  } else if (type === 1) {
    msgType = "success";
  } else if (type === 3) {
    msgType = "warning";
  }

  return MySwal.fire({
    title,
    text,
    icon: msgType,
    showCancelButton: true,
    confirmButtonText: "Yes",
    customClass: {
      confirmButton: "btn btn-primary mr-2 mx-2",
      cancelButton: "btn btn-outline-danger mx-2",
      content: "pt-1 pb-1",
      input: "mb-1 form-control alert-input-label",
      inputLabel: "mt-2 font-weight-bold",
    },
    buttonsStyling: false,
    input: textInputProps && textInputProps.enabled ? "textarea" : null,
    inputLabel: textInputProps ? textInputProps.inputLabel : null,
    inputPlaceholder: textInputProps ? textInputProps.placeholder : null,
    inputValidator: (value) => {
      if (!value) {
        return textInputProps.errorMsg;
      }
    },
  }).then(function (result) {
    if (result.value) {
      buttonEvent(result.value);
    }
  });
};

export const customToastMsg = (e, type, c) => {
  let msgType = "info";
  let assets = {
    color: "bg-info",
    icon: <AlertTriangle color={"#3f3d3d"} size={15} />,
  };
  if (type === 2) {
    msgType = "info";
    assets = {
      color: "bg-warning",
      icon: <AlertTriangle color={"#3f3d3d"} size={15} />,
    };
  } else if (type === 0) {
    msgType = "error";
    assets = {
      color: "bg-danger",
      icon: <X size={15} color={"#680000"} />,
    };
  } else if (type === 1) {
    msgType = "success";
    assets = {
      color: "bg-success",
      icon: <Check color={"#10df10"} size={15} />,
    };
  }

  toast[msgType](e, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const logout = () => {
  Cookies.remove(constant.ACCESS_TOKEN);
  Cookies.remove(constant.REFRESH_TOKEN);
  Cookies.remove(constant.Expire_time);
  Cookies.remove(constant.USER_PROFILE);
  Cookies.remove("Eligible");
  localStorage.removeItem(constant.CART_LIST);
  window.location.href = "/signin";
};

export const formatPrice = (value) => {
  return "LKR." + parseFloat(value).toFixed(2);
};

export const popUploader = (dispatch, val) => {
  dispatch({ type: "IS_LOADER", value: { isLoader: val, type: 0 } });
};

export const handleError = (c) => {
  c?.response?.data?.message
    ? customToastMsg(c?.response?.data?.message[0], 0)
    : customToastMsg("Sorry! Try again later", 0);
};
