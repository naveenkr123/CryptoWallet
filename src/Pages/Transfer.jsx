import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import tImg from "../images/transfer.svg";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";

function Transfer() {
  const [wallet_address, setWallet_address] = useState("");
  const [sameWA, setSameWA] = useState(false);
  const [errorWA, setErrorWA] = useState(false);
  const [invalidError, setInvalidError] = useState(false);
  const [balanceError, setBalanceError] = useState(false);
  const [transferMSG, setTransferMSG] = useState(false);
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
    setSameWA(false);
    setErrorWA(false);
    setInvalidError(false);
    setBalanceError(false);
    setTransferMSG(false);

    if (userData.walletAddress === wallet_address) {
      setSameWA(true);
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
          setErrorWA(true);
        } else {
          if (isNaN(amount) || amount <= 0) {
            // Invalid amount error
            setInvalidError(true);
          } else {
            // Check sender's balance
            if (amount > senderData.balance) {
              // Insufficient balance error
              console.log(senderData.balance);
              setBalanceError(true);
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

                setTransferMSG(true);
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
                    <p
                      className={`text-danger ${sameWA ? "d-block" : "d-none"}`}
                    >
                      Can't enter same wallet address!
                    </p>
                    <p
                      className={`text-danger ${
                        errorWA ? "d-block" : "d-none"
                      }`}
                    >
                      Wallet address not found!
                    </p>
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
                    <p
                      className={`text-danger ${
                        invalidError ? "d-block" : "d-none"
                      }`}
                    >
                      Invalid amount!
                    </p>
                    <p
                      className={`text-danger ${
                        balanceError ? "d-block" : "d-none"
                      }`}
                    >
                      Insufficient balance!
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="blue-btn rounded w-100 py-2 px-3"
                  >
                    Transfer
                  </button>
                </form>

                <div
                  className={`alert alert-success my-4 ${
                    transferMSG ? "d-block" : "d-none"
                  }`}
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
