import React, { useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import login from "../assets/images/login.svg";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [userRecord, setUserRecord] = useState({});
  const [pin, setPIN] = useState("");
  const [TFA_active, setTFA_active] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authError, setAuthError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const myContext = useContext(AppContext);
  const navigate = useNavigate();

  // Current Date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "short" }
  )} ${currentDate.getFullYear()}`;

  async function authentication(event) {
    event.preventDefault();

    if (pin === userRecord.pin) {
      // update last login in database
      await fetch(`http://${myContext.serverIP}:8000/users/${userRecord.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userRecord,
          lastLogin: formattedDate,
        }),
      });

      myContext.setLoginStatus(true);
      myContext.setUserData(userRecord);
      navigate("/wallet");
    } else {
      setAuthError(true);
    }
  }

  async function verifyAccount(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://${myContext.serverIP}:8000/users?userID=${userID}`
      );
      const userData = await response.json();
      // console.log("log", userData[0]);
      if (userData.length === 0) {
        setErrorMessage("Account not found!");
      } else {
        const user = userData[0];
        setUserRecord(userData[0]);
        if (password === user.password) {
          if (user.TFA) {
            setTFA_active(true);
          } else {
            // update last login in database
            await fetch(
              `http://${myContext.serverIP}:8000/users/${userData[0].id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...userData[0],
                  lastLogin: formattedDate,
                }),
              }
            );

            myContext.setLoginStatus(true);
            myContext.setUserData(userData[0]);
            navigate("/wallet");
          }
        } else {
          setErrorMessage("Incorrect password!");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  return (
    <Wrapper>
      <section>
        <Container>
          <Row>
            <Col lg="7" className="d-none d-lg-block">
              <img
                src={login}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                alt=""
              />
            </Col>
            <Col lg="5">
              <div className="w-100 h-100 py-5 p-md-5">
                <div
                  className="login-div mx-auto pb-5"
                  style={{ width: "300px" }}
                >
                  <h3 className="text-center fw-bold mb-1">
                    Crypto<span style={{ color: "#072541" }}>Wallet</span>
                  </h3>
                  <p className="text-center text-secondary mb-5">
                    Login to your account
                  </p>

                  <form onSubmit={verifyAccount}>
                    <div className="mb-3">
                      <label className="fs-6 fw-medium">User ID</label>
                      <input
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        type="text"
                        className="form-control"
                        id="loginID"
                        aria-describedby="emailHelp"
                        placeholder="Enter your user ID"
                        required
                      />
                    </div>
                    <label htmlFor="loginPass" className="fs-6 fw-medium">
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="loginPass"
                        aria-describedby="emailHelp"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="eye_btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <span class="material-symbols-rounded">
                            visibility
                          </span>
                        ) : (
                          <span class="material-symbols-rounded">
                            visibility_off
                          </span>
                        )}
                      </button>
                    </div>
                    <button
                      type="submit"
                      className={`primaryBtn rounded w-100 py-2 px-3 mt-4 ${
                        TFA_active ? "d-none" : "d-block"
                      }`}
                    >
                      Login
                    </button>
                  </form>

                  {errorMessage && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={authentication}>
                    <div
                      className={`mt-3 ${TFA_active ? "d-block" : "d-none"}`}
                    >
                      <label className="fw-medium">PIN (2FA)</label>
                      <input
                        value={pin}
                        onChange={(e) => setPIN(parseInt(e.target.value))}
                        type="password"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        className="form-control"
                        id="loginPIN"
                        required
                      />
                      <p
                        className={`text-danger m-0 ${
                          authError ? "d-block" : "d-none"
                        }`}
                      >
                        Incorrect PIN
                      </p>
                      <button
                        type="submit"
                        className="primaryBtn mt-3 py-2 w-100"
                      >
                        Authenticate
                      </button>
                    </div>
                  </form>

                  <p className="text-center my-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none">
                      Sign Up
                    </Link>
                  </p>

                  <div className="alert alert-warning" role="alert">
                    Warning! There is no password recovery option due to
                    security reasons.
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Login;
