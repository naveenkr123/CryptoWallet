import React, { useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function Register() {
  const myContext = useContext(AppContext);
  const navigate = useNavigate();
  const [userIDinput, setUserIDinput] = useState("");
  const [passwordinput, setPasswordinput] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [repeatPIN, setRepeatPIN] = useState("");
  const [accSuccess, setAccSuccess] = useState(false);
  const [idExist, setIDexist] = useState(false);
  const [passError, setPassError] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [pinValidation, setPinValidation] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [user, setUser] = useState({
    userID: "",
    walletAddress: "",
    password: "",
    pin: null,
    TFA: false,
    balance: 0,
  });

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    const inputBoxes = document.querySelectorAll(".enable-on-check");
    inputBoxes.forEach((inputBox) => {
      inputBox.disabled = !isChecked;
    });
  }

  function generateRandomString() {
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = 32;
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  async function setData(event) {
    event.preventDefault();

    // clear all previous error msg
    setIDexist(false);
    setValidationError(false);
    setPassError(false);
    setPinError(false);
    setPinValidation(false);

    // first check validation
    if (passwordinput.length < 6 || repeatPassword.length < 6) {
      setValidationError(true);
    } else {
      setValidationError(false);
      if (passwordinput !== repeatPassword) {
        setPassError(true);
      } else {
        if (isChecked) {
          if (
            pinInput.toString().length !== 4 ||
            repeatPIN.toString().length !== 4
          ) {
            setPinValidation(true);
          } else {
            if (pinInput !== repeatPIN) {
              setPinError(true);
            } else {
              try {
                const response = await fetch(
                  `http://${myContext.serverIP}:8000/users?userID=${userIDinput}`
                );
                const contentLength = response.headers.get("Content-Length");
                if (parseInt(contentLength) !== 2) {
                  console.log("User ID already exists");
                  setIDexist(true);
                } else {
                  // User ID is available, proceed with registration
                  const walletAddress = generateRandomString();
                  const updatedUser = {
                    ...user,
                    userID: userIDinput,
                    password: passwordinput,
                    walletAddress: walletAddress,
                    pin: isChecked ? pinInput : null,
                    TFA: isChecked ? true : false,
                  };
                  const createUserResponse = await fetch(
                    `http://${myContext.serverIP}:8000/users`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(updatedUser),
                    }
                  );

                  if (createUserResponse.ok) {
                    console.log("Account created successfully!");
                    setUser(updatedUser);
                    setPassError(false);
                    setIDexist(false);
                    setAccSuccess(true);
                    setTimeout(() => {
                      navigate("/login");
                      window.location.reload();
                    }, 2000);
                  } else {
                    console.error(
                      "Error creating account:",
                      createUserResponse.statusText
                    );
                    // Display appropriate error message
                  }
                }
              } catch (error) {
                console.error("Error:", error);
                // Handle error
              }
            }
          }
        } else {
          try {
            const response = await fetch(
              `http://${myContext.serverIP}:8000/users?userID=${userIDinput}`
            );
            const contentLength = response.headers.get("Content-Length");
            if (parseInt(contentLength) !== 2) {
              console.log("User ID already exists");
              setIDexist(true);
            } else {
              // User ID is available, proceed with registration
              const walletAddress = generateRandomString();
              const updatedUser = {
                ...user,
                userID: userIDinput,
                password: passwordinput,
                walletAddress: walletAddress,
                pin: isChecked ? pinInput : null,
                TFA: isChecked ? true : false,
              };
              const createUserResponse = await fetch(
                `http://${myContext.serverIP}:8000/users`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedUser),
                }
              );

              if (createUserResponse.ok) {
                console.log("Account created successfully!");
                setUser(updatedUser);
                setPassError(false);
                setIDexist(false);
                setAccSuccess(true);
                setTimeout(() => {
                  navigate("/login");
                  window.location.reload();
                }, 2000);
              } else {
                console.error(
                  "Error creating account:",
                  createUserResponse.statusText
                );
                // Display appropriate error message
              }
            }
          } catch (error) {
            console.error("Error:", error);
            // Handle error
          }
        }
      }
    }
  }

  return (
    <Wrapper>
      <section>
        <Container>
          <div className="w-100 h-100 py-5 p-md-5">
            <div className="col-lg-6 login-div mx-auto pb-5">
              <h2 className="text-center fw-bold">
                Crypto<span style={{ color: "#072541" }}>Wallet</span>
              </h2>
              <h5 className="text-center fw-semibold mt-2 mb-5">
                Create new account
              </h5>
              <div
                className={`alert alert-success ${
                  accSuccess ? "d-block" : "d-none"
                }`}
                role="alert"
              >
                Account created successfully!
              </div>
              <form onSubmit={setData}>
                <Row>
                  <Col lg="12">
                    <div className="mb-2">
                      <p className="fs-6 fw-medium my-2 ms-1">Create User ID</p>
                      <input
                        type="text"
                        value={userIDinput}
                        onChange={(e) => {
                          setUserIDinput(e.target.value);
                        }}
                        className="form-control"
                        required
                      />
                      <p
                        className={`text-danger ${
                          idExist ? "d-block" : "d-none"
                        }`}
                      >
                        User ID already exists!
                      </p>
                    </div>
                  </Col>
                  <Col lg="12">
                    <Row>
                      <Col lg="6">
                        <div className="mb-2">
                          <p className="fs-6 fw-medium my-2 ms-1">Password</p>
                          <input
                            type="text"
                            className="form-control"
                            value={passwordinput}
                            onChange={(e) => {
                              setPasswordinput(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </Col>
                      <Col lg="6">
                        <div className="mb-2">
                          <p className="fs-6 fw-medium my-2 ms-1">
                            Repeat Password
                          </p>
                          <input
                            type="text"
                            className="form-control"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                      <p
                        className={`text-danger ${
                          validationError ? "d-block" : "d-none"
                        }`}
                      >
                        Password must contain atleast 6 characters.
                      </p>
                      <p
                        className={`text-danger ${
                          passError ? "d-block" : "d-none"
                        }`}
                      >
                        Password doesn't match!
                      </p>
                    </Row>
                  </Col>
                  <Col lg="12">
                    <div className="mt-4">
                      <h5>Two-Factor Authentication</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckChecked"
                          onChange={handleCheckboxChange}
                          checked={isChecked}
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckChecked"
                        >
                          Enable Two-Factor Authenication
                        </label>
                      </div>
                      <Row>
                        <Col lg="6">
                          <div>
                            <p className="fs-6 fw-medium my-2 ms-1">
                              PIN (4-digits)
                            </p>
                            <input
                              type="number"
                              pattern="[0-9]*"
                              inputMode="numeric"
                              value={pinInput}
                              onChange={(e) =>
                                setPinInput(parseInt(e.target.value))
                              }
                              className="form-control enable-on-check"
                              required
                              disabled={!isChecked}
                            />
                          </div>
                        </Col>
                        <Col lg="6">
                          <div>
                            <p className="fs-6 fw-medium my-2 ms-1">
                              Confirm PIN
                            </p>
                            <input
                              type="number"
                              pattern="[0-9]*"
                              inputMode="numeric"
                              value={repeatPIN}
                              onChange={(e) =>
                                setRepeatPIN(parseInt(e.target.value))
                              }
                              className="form-control enable-on-check"
                              required
                              disabled={!isChecked}
                            />
                          </div>
                        </Col>
                        <p
                          className={`text-danger ${
                            pinValidation ? "d-block" : "d-none"
                          }`}
                        >
                          PIN must be 4-digits only!
                        </p>
                        <p
                          className={`text-danger ${
                            pinError ? "d-block" : "d-none"
                          }`}
                        >
                          PIN doesn't match!
                        </p>
                      </Row>
                    </div>
                  </Col>
                </Row>

                <button
                  type="submit"
                  className="blue-btn rounded w-100 mt-4 py-2 px-3"
                >
                  Submit
                </button>
              </form>

              <p className="text-center my-4">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Log in
                </Link>
              </p>
              <div className="alert alert-warning" role="alert">
                Warning! Please note down account credentials because there is
                no account recovery option due to security reasons.
              </div>
              <div className="alert alert-info" role="alert">
                We don't ask for your personal details such as email, phone
                number, or even your name. We strive to keep your identity
                anonymous.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Register;
