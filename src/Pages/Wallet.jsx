import React, { useRef, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";

function Wallet() {
  const [balance, setBalance] = useState("");
  const qrCodeRef = useRef(null);
  const myContext = useContext(AppContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const userData = myContext.userData;

  // Redirect to login if userData is not available
  useEffect(() => {
    if (!userData || !myContext.loginStatus) {
      navigate("/login");
    }
  }, [userData, myContext, navigate]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (myContext.loginStatus && userData) {
          const response = await fetch(
            `http://${myContext.serverIP}:8000/users?walletAddress=${userData.walletAddress}`
          );
          const userData2 = await response.json();
          setBalance(userData2[0].balance);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [myContext.loginStatus, userData, myContext.serverIP]);

  // Render loading or nothing until redirected
  if (!userData || !myContext.loginStatus) {
    return null;
  }

  function copyAddress() {
    navigator.clipboard.writeText(myContext.userData.walletAddress);
    document.getElementById("copy_btn").innerHTML = "Copied!";
    document.getElementById("copy_btn").style.color = "green";
  }

  function copyID() {
    navigator.clipboard.writeText(myContext.userData.userID);
    document.getElementById("copy_btn_id").innerHTML = "Copied!";
    document.getElementById("copy_btn_id").style.color = "green";
  }

  const downloadQRCode = () => {
    // Get the QR code canvas
    const qrCodeCanvas = qrCodeRef.current.getElementsByTagName("canvas")[0];

    // Create a new canvas with the desired resolution and padding
    const resolution = 500;
    const padding = 20; // Adjust padding as needed
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = resolution;
    canvas.height = resolution;

    // Calculate QR code size and position
    const qrCodeSize = resolution - padding * 2;
    const qrCodeX = (resolution - qrCodeSize) / 2;
    const qrCodeY = (resolution - qrCodeSize) / 2;

    // Draw white background
    context.fillStyle = "#ffffff"; // White color
    context.fillRect(0, 0, resolution, resolution);

    // Draw the QR code onto the new canvas with padding
    context.drawImage(qrCodeCanvas, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

    // Convert canvas to data URL and trigger download
    const url = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "QR_Code.png";
    anchor.click();
  };

  return (
    <Wrapper>
      <section>
        <Container>
          <div className="col-lg-6 nCard my-4 mx-auto">
            <h5 className="mb-4 text-center">Wallet Balance</h5>
            <h1 className="m-0 mt-1 text-center text-secondary me-4 mb-4">
              ₿ <span className="text-black">{balance}</span>
            </h1>
            <div className="d-flex justify-content-center center gap-3">
              <Link to="/transfer">
                <button
                  className="btn btn-dark bg-black btn-sm d-flex align-content-center justify-content-center text-decoration-none border-0 px-3 rounded-pill"
                  style={{
                    backgroundColor: "#13aa52",
                    border: "1px solid #13aa52",
                  }}
                >
                  <span class="material-symbols-rounded">north_east</span>{" "}
                  Transfer BTC
                </button>
              </Link>
              <Link to="/transactions">
                <button className="btn btn-dark btn-sm bg-light d-flex align-content-center justify-content-center text-black border-light px-3 rounded-pill">
                  <span class="material-symbols-rounded">swap_vert</span>{" "}
                  Transactions
                </button>
              </Link>
            </div>

            <p className="m-0 fw-medium mt-4 mb-1">User ID: </p>
            <div
              className="rounded border p-2 mb-3 bg-light position-relative"
              style={{ wordWrap: "break-word" }}
            >
              <button
                onClick={copyID}
                id="copy_btn_id"
                className="rounded border border-2 bg-light px-2 position-absolute copy-btn d-none d-lg-block"
              >
                Copy
              </button>
              <h6 id="user_id" className="m-0 fw-normal">
                {myContext.userData.userID}
              </h6>
            </div>
            <p className="m-0 fw-medium mb-1">Crypto Address: </p>
            <div
              className="rounded border p-2 mb-3 bg-light position-relative"
              style={{ wordWrap: "break-word" }}
            >
              <button
                onClick={copyAddress}
                id="copy_btn"
                className="rounded border border-2 bg-light px-2 position-absolute copy-btn d-none d-lg-block"
              >
                Copy
              </button>
              <h6 id="wallet_address" className="m-0 fw-normal">
                {myContext.userData.walletAddress}
              </h6>
            </div>

            <div
              className="border border-2 rounded p-3 my-4 mx-auto"
              style={{ width: "200px", height: "200px" }}
              ref={qrCodeRef}
            >
              <QRCode
                value={myContext.userData.walletAddress}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="mx-auto" style={{ width: "fit-content" }}>
              <button
                className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                onClick={downloadQRCode}
              >
                <span class="material-symbols-rounded">download</span> Download
                QR
              </button>
            </div>

            <div className="alert alert-info my-3" role="alert">
              To receive Bitcoin, share the address or QR code above to the
              sender.
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Wallet;
