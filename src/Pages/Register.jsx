import React, { useState } from "react";
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

  function validation() {
    if (
      document.getElementById("passwordinput").value.length < 6 ||
      document.getElementById("passRepeatinput").value.length < 6
    ) {
      document.getElementById("pass-validate").style.display = "block";
    } else {
      document.getElementById("pass-validate").style.display = "none";
    }
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
    var userID = document.getElementById("userIDinput").value;
    var password = document.getElementById("passwordinput").value;
    var repeatPass = document.getElementById("passRepeatinput").value;

    if (password !== repeatPass) {
      console.log("Password Not Match");
      document.getElementById("pass-error").style.display = "block";
    } else {
      try {
        console.log("arrived");
        const response = await fetch(
          `http://localhost:8000/users?userID=${userID}`
        );
        const contentLength = response.headers.get("Content-Length");
        if (parseInt(contentLength) !== 2) {
          console.log("User ID already exists");
          document.getElementById("id_exist").style.display = "block";
          // Display appropriate error message
          // For example:
          // document.getElementById("userID-error").style.display = "block";
        } else {
          // User ID is available, proceed with registration
          const walletAddress = generateRandomString();
          console.log(walletAddress);
          const updatedUser = {
            ...user,
            userID: userID,
            password: password,
            walletAddress: walletAddress,
          };

          const createUserResponse = await fetch(
            "http://localhost:8000/users",
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
            document.getElementById("pass-error").style.display = "none";
            document.getElementById("id_exist").style.display = "none";
            document.getElementById("acc-success").style.display = "block";
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
                className="alert alert-success"
                id="acc-success"
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
                        id="userIDinput"
                        name="userID"
                        type="text"
                        className="form-control"
                        placeholder=""
                        required
                      />
                      <p id="id_exist">User ID already exists!</p>
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
                        onChange={validation}
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
                        onChange={validation}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <p id="pass-validate">Password must be atleast 6 characters.</p>
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
