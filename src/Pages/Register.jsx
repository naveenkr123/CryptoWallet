import React, { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import { AppContext } from "./AppContext";

function Register() {
  const myContext = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userID: "",
    password: "",
    repeatPassword: "",
    pin: "",
    repeatPIN: "",
    isChecked: false,
  });

  const [errors, setErrors] = useState({});
  const [accountSuccess, setAccountSuccess] = useState(false);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "short" }
  )} ${currentDate.getFullYear()}`;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateInputs = () => {
    const errors = {};

    if (formData.password.length < 6) {
      errors.validationError = "Password must contain at least 6 characters.";
    }
    if (formData.password !== formData.repeatPassword) {
      errors.passwordMismatch = "Passwords do not match.";
    }
    if (formData.isChecked) {
      if (formData.pin.length !== 4) {
        errors.pinValidation = "PIN must be 4 digits.";
      }
      if (formData.pin !== formData.repeatPIN) {
        errors.pinMismatch = "PINs do not match.";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkUserIDExists = async (userID) => {
    try {
      const response = await fetch(
        `http://${myContext.serverIP}:8000/users?userID=${userID}`
      );
      const contentLength = response.headers.get("Content-Length");
      return parseInt(contentLength) !== 2;
    } catch (error) {
      console.error("Error checking user ID:", error);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const userIDExists = await checkUserIDExists(formData.userID);
    if (userIDExists) {
      setErrors({ userIDExists: "User ID already exists!" });
      return;
    }

    const newUser = {
      userID: formData.userID,
      walletAddress: generateRandomString(),
      password: formData.password,
      pin: formData.isChecked ? parseInt(formData.pin, 10) : null,
      TFA: formData.isChecked,
      admin: false,
      role: "user",
      status: "active",
      joiningDate: formattedDate,
      lastLogin: "",
      balance: 5,
      isNotification: true,
      transactions: [],
      notifications: [
        {
          subject: "Welcome to CryptoWallet",
          date: formattedDate,
          content: `Hello ${formData.userID}, Welcome to CryptoWallet.\n Make sure you note down your account credentials because there is no account recovery option due to security reasons.`,
        },
        {
          subject: "Security Alert",
          date: formattedDate,
          content: `Hello ${formData.userID},\n Ensure you enable the 2FA feature to enhance the security of your account. You will have to enter the PIN each time you are sending CryptoCoins and Login. Please ignore if done already.`,
        },
      ],
    };

    try {
      const createUserResponse = await fetch(
        `http://${myContext.serverIP}:8000/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (createUserResponse.ok) {
        setAccountSuccess(true);
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error creating account:", createUserResponse.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Wrapper>
      <section>
        <Container>
          <div className="w-100 h-100 py-5 px-4 p-md-5">
            <div className="col-lg-6 login-div mx-auto pb-5">
              <h4 className="text-center fw-bold mb-0">
                Crypto<span style={{ color: "#072541" }}>Wallet</span>
              </h4>
              <p className="text-center text-secondary mt-0 mb-5">
                Create new account
              </p>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="12">
                    <div className="mb-2">
                      <p className="fs-6 fw-medium my-1 ms-1">Create User ID</p>
                      <input
                        type="text"
                        name="userID"
                        value={formData.userID}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                      {errors.userIDExists && (
                        <p className="text-danger">{errors.userIDExists}</p>
                      )}
                    </div>
                  </Col>
                  <Col lg="12">
                    <Row>
                      <Col lg="6">
                        <div className="mb-2">
                          <p className="fs-6 fw-medium my-1 ms-1">Password</p>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>
                      <Col lg="6">
                        <div className="mb-2">
                          <p className="fs-6 fw-medium my-1 ms-1">
                            Repeat Password
                          </p>
                          <input
                            type="password"
                            name="repeatPassword"
                            className="form-control"
                            value={formData.repeatPassword}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>
                    </Row>
                    {errors.validationError && (
                      <p className="text-danger">{errors.validationError}</p>
                    )}
                    {errors.passwordMismatch && (
                      <p className="text-danger">{errors.passwordMismatch}</p>
                    )}
                  </Col>
                  <Col lg="12">
                    <div className="mt-4">
                      <h5>Two-Factor Authentication</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckChecked"
                          name="isChecked"
                          onChange={handleInputChange}
                          checked={formData.isChecked}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          Enable Two-Factor Authentication
                        </label>
                      </div>
                      {formData.isChecked && (
                        <Row>
                          <Col lg="6">
                            <div>
                              <p className="fs-6 fw-medium my-1 ms-1">
                                PIN (4-digits)
                              </p>
                              <input
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                name="pin"
                                value={formData.pin}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div>
                              <p className="fs-6 fw-medium my-1 ms-1">
                                Confirm PIN
                              </p>
                              <input
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                name="repeatPIN"
                                value={formData.repeatPIN}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </div>
                          </Col>
                        </Row>
                      )}
                      {errors.pinValidation && (
                        <p className="text-danger">{errors.pinValidation}</p>
                      )}
                      {errors.pinMismatch && (
                        <p className="text-danger">{errors.pinMismatch}</p>
                      )}
                    </div>
                  </Col>
                </Row>
                <button
                  type="submit"
                  className="primaryBtn rounded w-100 mt-4 py-2 px-3"
                >
                  Submit
                </button>
              </form>
              {accountSuccess && (
                <div className="alert alert-success mt-2" role="alert">
                  Account created successfully!
                </div>
              )}

              <p className="text-center my-4">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Log in
                </Link>
              </p>

              <div className="alert alert-info" role="alert">
                <ul>
                  <li>
                    Warning! Please note down your account credentials because
                    there is no account recovery option due to security reasons.
                  </li>
                  <li>
                    We don't ask for your personal details such as email, phone
                    number, or even your name. We strive to keep your identity
                    anonymous.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

function generateRandomString() {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(
    { length: 32 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
}

export default Register;
