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
  const [accSuccess, setAccSuccess] = useState(false);
  const [passError, setPassError] = useState(false);
  const [idExist, setIDexist] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [user, setUser] = useState({
    userID: "",
    walletAddress: "",
    password: "",
    pin: null,
    TFA: false,
    balance: 0,
  });

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

    // first check validation
    if (passwordinput.length < 6 || repeatPassword.length < 6) {
      setValidationError(true);
    } else {
      setValidationError(false);
      if (passwordinput !== repeatPassword) {
        console.log("Password Not Match");
        setPassError(true);
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
            console.log(walletAddress);
            const updatedUser = {
              ...user,
              userID: userIDinput,
              password: passwordinput,
              walletAddress: repeatPassword,
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
                </Row>
                <p
                  className={`text-danger ${
                    validationError ? "d-block" : "d-none"
                  }`}
                >
                  Password must be atleast 6 characters.
                </p>
                <p
                  className={`text-danger ${passError ? "d-block" : "d-none"}`}
                >
                  Password doesn't match!
                </p>
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
