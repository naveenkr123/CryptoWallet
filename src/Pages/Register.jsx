import React, { useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userID: "",
    walletAddress: "",
    password: "",
    balance: 0,
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

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

  function setData(event) {
    event.preventDefault();
    var userID = document.getElementById("userIDinput").value;
    var password = document.getElementById("passwordinput").value;
    var repeatPass = document.getElementById("passRepeatinput").value;
    const walletAddress = generateRandomString();
    console.log(walletAddress);

    if (password !== repeatPass) {
      console.log("Password Not Match");
      document.getElementById("pass-error").style.display = "block";
    } else {
      const updatedUser = {
        ...user,
        userID: userID,
        password: password,
        walletAddress: walletAddress,
      };

      fetch("http://10.5.48.118:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log response data
          setUser(updatedUser); // Update state after successful POST
          setTimeout(() => {
            navigate("/login");
            window.location.reload(); // Reload the page
          }, 2000);
        })
        .catch((error) => console.error("Error:", error));

      document.getElementById("pass-error").style.display = "none";

      //success msg
      document.getElementById("acc-success").style.display = "block";
    }
  }

  return (
    <Wrapper>
      <section>
        <Container>
          <div className="w-100 h-100 py-5 p-md-5">
            <div className="col-lg-8 login-div mx-auto pb-5">
              <h2 className="text-center fw-bold">
                Crypto<span style={{ color: "#072541" }}>Wallet</span>
              </h2>
              <h5 className="text-center fw-semibold mt-2 mb-5">
                Create new account
              </h5>
              <div
                className="alert alert-success"
                id="acc-success"
                role="alert"
              >
                Account created successfully!
              </div>
              <form onSubmit={setData}>
                <Row>
                  <Col lg="12">
                    <div className="mb-3">
                      <p className="fs-6 fw-medium my-2 ms-1">Create User ID</p>
                      <input
                        id="userIDinput"
                        name="userID"
                        type="text"
                        className="form-control"
                        placeholder=""
                        required
                      />
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="mb-2">
                      <p className="fs-6 fw-medium my-2 ms-1">Password</p>
                      <input
                        id="passwordinput"
                        name="password"
                        type="text"
                        className="form-control"
                        placeholder=""
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
                        id="passRepeatinput"
                        name="repeatPass"
                        type="text"
                        className="form-control"
                        placeholder=""
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <p id="pass-error">Password doesn't match!</p>
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
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Register;
