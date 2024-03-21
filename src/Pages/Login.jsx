import React, { useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import login from "../images/login.svg";
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

  const myContext = useContext(AppContext);
  const navigate = useNavigate(); // Initialize useNavigate

  function authentication() {
    debugger;
    console.log(typeof pin, typeof userRecord.pin);
    if (pin === userRecord.pin) {
      console.log("PIN matched!");
      // PIN matches
      myContext.setLoginStatus(true);
      myContext.setUserData(userRecord);
      navigate("/account"); // Navigate to Account page
    } else {
      setAuthError(true);
    }
  }

  async function verifyAccount(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/users?userID=${userID}`
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
            // Password matches
            myContext.setLoginStatus(true);
            myContext.setUserData(userData[0]);
            navigate("/account"); // Navigate to Account page
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
                  <h2 className="text-center fw-bold">
                    Crypto<span style={{ color: "#072541" }}>Wallet</span>
                  </h2>
                  <h5 className="text-center fw-semibold mt-2 mb-5">
                    Login to your account
                  </h5>

                  <form onSubmit={verifyAccount}>
                    <div className="mb-3">
                      <p className="fs-6 fw-medium my-2 ms-1">User ID</p>
                      <input
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        type="text"
                        className="form-control"
                        id="loginID"
                        aria-describedby="emailHelp"
                        placeholder=""
                        required
                      />
                    </div>
                    <div>
                      <p className="fs-6 fw-medium my-2 ms-1">Password</p>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="loginPass"
                        aria-describedby="emailHelp"
                        placeholder=""
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="blue-btn rounded w-100 py-2 px-3 mt-4"
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
                      className={`card mt-4 ${
                        TFA_active ? "d-block" : "d-none"
                      }`}
                    >
                      <div className="card-header">
                        Two-Factor Authentication (2FA)
                      </div>
                      <div className="card-body">
                        <div>
                          <p className="fs-6 fw-medium ms-1 mb-1">PIN</p>
                          <input
                            value={pin}
                            onChange={(e) => setPIN(parseInt(e.target.value))}
                            type="number"
                            className="form-control"
                            id="loginPIN"
                            aria-describedby="emailHelp"
                            placeholder=""
                            required
                          />
                          <p
                            className={`text-danger ${
                              authError ? "d-block" : "d-none"
                            }`}
                          >
                            Incorrect PIN
                          </p>
                          <button
                            type="submit"
                            className="btn btn-success mt-4 w-100"
                          >
                            Authenticate
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  <p className="text-center my-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none">
                      Click here
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
