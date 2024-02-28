import React, { useRef } from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function Account() {
  const qrCodeRef = useRef(null);
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

  console.log(userData);

  function copyAddress() {
    navigator.clipboard.writeText(status.userData.walletAddress);
    document.getElementById("copy_btn").innerHTML = "Copied!";
    document.getElementById("copy_btn").style.color = "green";
  }

  function copyID() {
    navigator.clipboard.writeText(status.userData.userID);
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
          <div className="col-lg-8 border border-2 rounded p-4 my-5 mx-auto">
            <h2 className="mb-4 text-center">Wallet</h2>
            <div className="border border-2 rounded p-3 mb-3">
              <p className="m-0 fw-semibold">Balance: </p>
              <h3 className="m-0 mt-1">
                BTC{" "}
                <span className="text-success">{status.userData.balance}</span>
              </h3>
            </div>

            <p className="m-0 fw-semibold mt-4 mb-2">User ID: </p>
            <div
              className="rounded border p-2 mb-3 bg-light position-relative"
              style={{ wordWrap: "break-word" }}
            >
              <button
                onClick={copyID}
                id="copy_btn_id"
                className="rounded border border-2 bg-light px-2 position-absolute copy-btn"
              >
                Copy
              </button>
              <h6 id="user_id" className="m-0">
                {status.userData.userID}
              </h6>
            </div>
            <p className="m-0 fw-semibold mt-4 mb-2">Crypto Address: </p>
            <div
              className="rounded border p-2 mb-3 bg-light position-relative"
              style={{ wordWrap: "break-word" }}
            >
              <button
                onClick={copyAddress}
                id="copy_btn"
                className="rounded border border-2 bg-light px-2 position-absolute copy-btn"
              >
                Copy
              </button>
              <h6 id="wallet_address" className="m-0">
                {status.userData.walletAddress}
              </h6>
            </div>

            <div
              className="border border-2 rounded p-4 my-4 mx-auto"
              style={{ width: "250px", height: "250px" }}
              ref={qrCodeRef}
            >
              <QRCode
                value={status.userData.walletAddress}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="mx-auto" style={{ width: "fit-content" }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={downloadQRCode}
              >
                Download QR
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

export default Account;
