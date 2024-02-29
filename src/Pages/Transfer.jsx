import React, { useContext, useEffect } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import tImg from "../images/transfer.svg";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";

function Transfer() {
  const status = useContext(AppContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const userData = status.userData;

  console.log("context", status);

  // Redirect to login if userData is not available
  useEffect(() => {
    if (!userData || !status.loginStatus) {
      navigate("/login");
    }
  }, [userData, status, navigate]);

  // Render loading or nothing until redirected
  if (!userData || !status.loginStatus) {
    return null;
  }

  async function transferBTC(event) {
    event.preventDefault();

    const wallet_address = document.getElementById("transferWA").value;
    const amount = parseFloat(document.getElementById("transferAmt").value);

    if (isNaN(amount) || amount <= 0) {
      document.getElementById("zero-error").style.display = "block";
    } else {
      console.log(status.userData);
      document.getElementById("zero-error").style.display = "none";
      if (amount > status.userData.balance) {
        document.getElementById("balance_error").style.display = "block";
      } else {
        try {
          const response = await fetch(
            `http://localhost:8000/users?walletAddress=${wallet_address}`
          );

          const contentLength = response.headers.get("Content-Length");
          if (parseInt(contentLength) === 2) {
            console.log("Wallet address not found!");
          } else {
            console.log(response);
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
      <section className="py-5">
        <Container>
          <Row>
            <Col lg="4">
              <div className="login-div">
                <h2 className="text-center fw-bold">
                  Crypto<span style={{ color: "#072541" }}>Wallet</span>
                </h2>
                <h5 className="text-center fw-semibold mt-2 mb-5">
                  Transfer CryptoCoins
                </h5>
                <div
                  className="alert alert-danger my-4"
                  id="balance_error"
                  role="alert"
                >
                  Insufficient balance!
                </div>
                <form onSubmit={transferBTC}>
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-2 ms-1">Wallet Address</p>
                    <input
                      type="text"
                      className="form-control"
                      id="transferWA"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <div
                      className="alert alert-danger mt-2 mb-4"
                      id=""
                      role="alert"
                    >
                      Wallet address not found!
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="fs-6 fw-medium my-2 ms-1">BTC Amount</p>
                    <input
                      type="text"
                      className="form-control"
                      id="transferAmt"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <p id="zero-error">Invalid amount!</p>
                  </div>
                  <button
                    type="submit"
                    className="blue-btn rounded w-100 py-2 px-3"
                  >
                    Transfer
                  </button>
                </form>

                <div className="alert alert-success my-4" role="alert">
                  Transferred Successfully!
                </div>
                <div className="alert alert-danger my-4" role="alert">
                  Wallet address is not found.
                  <br />
                  Transfer failed!
                </div>
                <div className="alert alert-info my-4" role="alert">
                  Transaction fee depends on network load, 0.0005 Bitcoins from
                  your balance will be reserved for fees.
                </div>
              </div>
            </Col>
            <Col lg="8">
              <div className="p-5 d-none d-md-block">
                <img src={tImg} className="img-fluid" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Transfer;
