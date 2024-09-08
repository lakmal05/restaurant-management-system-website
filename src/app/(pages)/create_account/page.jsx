"use client";
import React, { useState } from "react";
import "../../_styles/scss/SignIn.scss";
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
} from "reactstrap";
import Image from "next/image";
import {
  customToastMsg,
  popUploader,
  validateInputs,
} from "../../../util/CommonFun";
import logo from "../../../../public/img/ui/TastBudzLogo.png";
import { isEmail, isEmpty, isPassword } from "../../../util/enum";
import * as constant from "../../../util/constants";
import { useRouter } from "next/navigation";
import { createAccount } from "@/src/service/auth";
import { useDispatch } from "react-redux";

const Page = () => {
  const router = useRouter();
  //  const dispatch = useDispatch();

  const [temp, setTemp] = useState({
    email: "",
    password: "",
    con_password: "",
    firstName: "",
    lastName: "",
    contactNo: "",
  });

  const handleInputChange = (fieldName, value) => {
    setTemp((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSignIn = async () => {
    // popUploader(dispatch, true);

    const data = {
      firstName: temp.firstName,
      lastName: temp.lastName,
      contactNo: temp.contactNo,
      email: temp.email,
      password: temp.password,
    };

    createAccount(data)
      .then((res) => {
        window.location.href = "/login";
        // popUploader(dispatch, false);
      })
      .catch((c) => {
        // popUploader(dispatch, false);
        customToastMsg(c.message, 0);
      });
  };

  const validateInputsDetails = () => {
    if (temp.firstName === "") {
      customToastMsg("First name cannot be empty");
    } else if (temp.lastName === "") {
      customToastMsg("Last name cannot be empty");
    } else if (!validateInputs(temp.password, ["isEmpty"]).isValid) {
      customToastMsg(validateInputs(temp.password, ["isEmpty"]).errorMessage);
    } else if (temp.password !== temp?.con_password) {
      customToastMsg("Recheck confirmation password");
    } else if (temp.contactNo === "") {
      customToastMsg("Contact No cannot be empty");
    } else if (!validateInputs(temp.email, ["isEmpty", "isEmail"]).isValid) {
      customToastMsg(
        validateInputs(temp.email, ["isEmpty", "isEmail"]).errorMessage
      );
    } else {
      handleSignIn();
    }
  };

  return (
    <div>
      <div className="createAccount">
        <Row className="d-flex justify-content-end">
          <Col md={6} lg={6} xl={6}>
            <Card className="forgot-card">
              <CardBody>
                <Form className="user-form">
                  <Image
                    src={logo}
                    width={150}
                    height="auto"
                    alt="Picture of the author"
                  />
                  <h1>Create Account</h1>
                  <p>
                    Let's begin the journey together! Create your account and
                    start exploring.
                  </p>

                  {/* first name , last name */}
                  <Row gutter={24}>
                    <Col span={12}>
                      <FormGroup name="firstName" label="First Name">
                        <Input
                          placeholder="Enter your first name"
                          size="large"
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          type="text"
                          id="firstName"
                          value={temp.firstName}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col span={12}>
                      <FormGroup name="lastName" label="Last Name">
                        <Input
                          placeholder="Enter your last name"
                          size="large"
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          type="text"
                          id="lastName"
                          value={temp.lastName}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* password */}
                  <Row gutter={24}>
                    <Col span={12}>
                      <FormGroup name="password" label="Enter your password">
                        <Input
                          placeholder="Enter your password"
                          size="large"
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          type="password"
                          id="password"
                          value={temp.password}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col span={12}>
                      <FormGroup
                        name="confirm-password"
                        label="confirm password"
                      >
                        <Input
                          placeholder="confirm password"
                          size="large"
                          onChange={(e) =>
                            handleInputChange("con_password", e.target.value)
                          }
                          type="password"
                          id="con-password"
                          value={temp.con_password}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* contact, email */}
                  <Row gutter={24}>
                    <Col span={12}>
                      <FormGroup name="contactNo" label="Contact Number">
                        <Input
                          placeholder="Enter your contact number"
                          size="large"
                          onChange={(e) =>
                            handleInputChange("contactNo", e.target.value)
                          }
                          type="number"
                          id="contactNo"
                          value={temp.contactNo}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col span={12}>
                      <FormGroup name="email" label="Enter your email">
                        <Input
                          placeholder="Enter your email"
                          size="large"
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          type="email"
                          id="email"
                          value={temp.email}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="d-flex justify-content-end">
                      <Button
                        className="btn-create"
                        onClick={validateInputsDetails}
                      >
                        Create
                      </Button>
                    </Col>
                  </Row>
                  <Row className="d-flex upper-border justify-content-start">
                    <Col md={12} className="mt-2">
                      <span>
                        Already Have an Account ?{" "}
                        <span
                          onClick={() => {
                            router.push("/login");
                          }}
                          className="text-hint"
                        >
                          Login
                        </span>
                      </span>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <div className="bottom-margin"></div>
        </Row>
      </div>
    </div>
  );
};

export default Page;
