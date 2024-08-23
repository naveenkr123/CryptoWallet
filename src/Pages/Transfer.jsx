import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import tImg from "../assets/images/transfer.svg";
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
  const navigate = useNavigate();
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

    // Disable form submission button to prevent multiple submissions
    setTransferMSG(false);
    setSameWA(false);
    setErrorWA(false);
    setInvalidError(false);
    setBalanceError(false);

    if (userData.walletAddress === wallet_address) {
      setSameWA(true);
      return;
    }

    try {
      // Fetch sender and recipient data concurrently
      const [senderResponse, recipientResponse] = await Promise.all([
        fetch(
          `http://${myContext.serverIP}:8000/users/${myContext.userData.id}`
        ),
        fetch(
          `http://${myContext.serverIP}:8000/users?walletAddress=${wallet_address}`
        ),
      ]);

      const senderData = await senderResponse.json();
      const recipientData = await recipientResponse.json();

      if (recipientData.length === 0) {
        setErrorWA(true); // Wallet address not found error!
        return;
      }

      if (isNaN(amount) || amount <= 0) {
        setInvalidError(true); // Invalid amount error
        return;
      }

      if (amount > senderData.balance) {
        setBalanceError(true); // Insufficient balance error
        return;
      }

      // Calculate updated balances
      const senderUpdatedBalance = senderData.balance - amount;
      const recipientUpdatedBalance = recipientData[0].balance + amount;

      // Perform debit and credit operations concurrently
      const [senderPutResponse, recipientPutResponse] = await Promise.all([
        fetch(
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
        ),
        fetch(
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
        ),
      ]);

      if (senderPutResponse.ok && recipientPutResponse.ok) {
        setTransferMSG(true); // Transfer successful
      } else {
        // Handle partial failure and revert the operation if necessary
        console.error("Error: Transfer failed, reverting...");
        await fetch(
          `http://${myContext.serverIP}:8000/users/${myContext.userData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...senderData,
              balance: senderData.balance, // Revert to original balance
            }),
          }
        );
        setBalanceError(true);
      }
    } catch (error) {
      console.error("Transfer Error:", error);
      setBalanceError(true);
    }
  }

  return (
    <Wrapper>
      <section className="py-5">
        <Container>
          <Row>
            <Col lg="4">
              <div className="px-3 px-md-0">
                <h2 className="text-center fw-bold">
                  Crypto<span style={{ color: "#072541" }}>Wallet</span>
                </h2>
                <h5 className="text-center fw-semibold mt-2 mb-5">
                  Transfer CryptoCoins
                </h5>

                <form onSubmit={transferBTC}>
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-1 ms-1">Wallet Address</p>
                    <input
                      type="text"
                      value={wallet_address}
                      onChange={(e) => setWallet_address(e.target.value)}
                      className="form-control"
                      id="transferWA"
                      aria-describedby="emailHelp"
                      placeholder="Enter wallet address"
                    />
                    <p
                      className={`text-danger ${sameWA ? "d-block" : "d-none"}`}
                    >
                      Can't enter the same wallet address!
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
                    <p className="fs-6 fw-medium my-1 ms-1">BTC Amount</p>
                    <input
                      type="number"
                      step="0.00001"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                      id="transferAmt"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="0.00"
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
                    className="blue-btn rounded border-0 w-100 py-2 px-3"
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
              <div className="px-5 d-none d-md-block">
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
