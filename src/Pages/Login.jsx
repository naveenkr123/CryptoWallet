import React, { useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import login from "../images/login.svg";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function Login() {
  const status = useContext(AppContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const [errorMessage, setErrorMessage] = useState("");

  async function verifyAccount(event) {
    event.preventDefault();

    const userID = document.getElementById("loginID").value;
    const password = document.getElementById("loginPass").value;

    try {
      const response = await fetch(
        `http://localhost:8000/users?userID=${userID}`
      );
      const userData = await response.json();
      // console.log("log", userData[0]);
      if (userData.length === 0) {
        setErrorMessage("Account not found!");
      } else {
        const user = userData[0]; // Assuming userID is unique
        if (user.password === password) {
          // Password matches
          status.setLoginStatus(true);
          status.setUserData(userData[0]);
          navigate("/account", { state: { userData } }); // Navigate to Account component with state
        } else {
          setErrorMessage("Incorrect password!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
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
                  <p className="fs-6 fw-medium my-2 ms-1">User ID</p>
                  <form onSubmit={verifyAccount}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="loginID"
                        aria-describedby="emailHelp"
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <p className="fs-6 fw-medium my-2 ms-1">Password</p>
                      <input
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
                      className="blue-btn rounded w-100 py-2 px-3"
                    >
                      Login
                    </button>
                  </form>
                  {errorMessage && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {errorMessage}
                    </div>
                  )}
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
