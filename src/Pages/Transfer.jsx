import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import tImg from "../images/transfer.svg";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";

function Transfer() {
  const [wallet_address, setWallet_address] = useState("");
  const [amount, setAmount] = useState("");

  const myContext = useContext(AppContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const userData = myContext.userData;

  // console.log("context", myContext);

  // Redirect to login if userData is not available
  useEffect(() => {
    if (!userData || !myContext.loginStatus) {
      navigate("/login");
    }
  }, [userData, myContext, navigate]);

  // Render loading or nothing until redirected
  if (!userData || !myContext.loginStatus) {
    return null;
  }

  async function transferBTC(event) {
    event.preventDefault();

    // clear all previous error messages
    document.getElementById("WA-same").style.display = "none";
    document.getElementById("WA-error").style.display = "none";
    document.getElementById("zero-error").style.display = "none";
    document.getElementById("balance_error").style.display = "none";
    document.getElementById("transfer-success").style.display = "none";

    if (userData.walletAddress === wallet_address) {
      document.getElementById("WA-same").style.display = "block";
    } else {
      try {
        // Fetch sender data
        const senderResponse = await fetch(
          `http://${myContext.serverIP}:8000/users/${myContext.userData.id}`
        );
        const senderData = await senderResponse.json();

        // Fetch recipient data
        const recipientResponse = await fetch(
          `http://${myContext.serverIP}:8000/users?walletAddress=${wallet_address}`
        );
        const recipientData = await recipientResponse.json();

        if (recipientData.length === 0) {
          // Wallet address not found error!
          document.getElementById("WA-error").style.display = "block";
        } else {
          if (isNaN(amount) || amount <= 0) {
            // Invalid amount error
            document.getElementById("zero-error").style.display = "block";
          } else {
            // Check sender's balance
            if (amount > senderData.balance) {
              // Insufficient balance error
              console.log(senderData.balance);
              document.getElementById("balance_error").style.display = "block";
            } else {
              // Calculate updated balances
              const senderUpdatedBalance = senderData.balance - amount;
              const recipientUpdatedBalance = recipientData[0].balance + amount;

              // Update sender's balance
              const senderPutResponse = await fetch(
                `http://${myContext.serverIP}:8000/users/${myContext.userData.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...senderData,
                    balance: senderUpdatedBalance,
                  }),
                }
              );

              // Update recipient's balance
              const recipientPutResponse = await fetch(
                `http://${myContext.serverIP}:8000/users/${recipientData[0].id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...recipientData[0],
                    balance: recipientUpdatedBalance,
                  }),
                }
              );

              if (senderPutResponse.ok && recipientPutResponse.ok) {
                // Transfer successful msg

                document.getElementById("transfer-success").style.display =
                  "block";
              } else {
                // Handle errors
              }
            }
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

                <form onSubmit={transferBTC}>
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-2 ms-1">Wallet Address</p>
                    <input
                      type="text"
                      value={wallet_address}
                      onChange={(e) => setWallet_address(e.target.value)}
                      className="form-control"
                      id="transferWA"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <div
                      className="alert alert-danger mt-2 mb-4"
                      id="WA-same"
                      role="alert"
                    >
                      Can't enter same wallet address!
                    </div>
                    <div
                      className="alert alert-danger mt-2 mb-4"
                      id="WA-error"
                      role="alert"
                    >
                      Wallet address not found!
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="fs-6 fw-medium my-2 ms-1">BTC Amount</p>
                    <input
                      type="number"
                      step="0.00001"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                      id="transferAmt"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder=""
                      inputMode="numeric"
                    />
                    <div
                      className="alert alert-danger my-4"
                      id="balance_error"
                      role="alert"
                    >
                      Insufficient balance!
                    </div>
                    <p id="zero-error">Invalid amount!</p>
                  </div>
                  <button
                    type="submit"
                    className="blue-btn rounded w-100 py-2 px-3"
                  >
                    Transfer
                  </button>
                </form>

                <div
                  id="transfer-success"
                  className="alert alert-success my-4"
                  role="alert"
                >
                  Transferred Successfully!
                </div>

                <div className="alert alert-info my-4" role="alert">
                  <ul>
                    <li>Minimum transfer amount is 0.00001 BTC</li>
                    <li>Transaction fee depends on network load.</li>
                    <li>
                      0.0005 Bitcoins from your balance will be reserved for
                      fees.
                    </li>
                  </ul>
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
