import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";

function Register() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [repeatPIN, setRepeatPIN] = useState("");
  const [pinError, setPinError] = useState(false);
  const [pinValidation, setPinValidation] = useState(false);
  const [passError, setPassError] = useState(false);
  const [correctPassError, setCorrectPassError] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [failedError, setFailedError] = useState(false);
  const [passChange, setPassChange] = useState(false);
  const [pinChange, setPinChange] = useState(false);
  const [deletionConfirm, setDeletionConfirm] = useState("");
  const [deletionError, setDeletionError] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

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

  async function changePassword(event) {
    event.preventDefault();
    setPassError(false);
    setCorrectPassError(false);
    setValidationError(false);
    setFailedError(false);
    setPassChange(false);

    if (userData.password === currentPass) {
      if (newPass === repeatPass) {
        if (newPass.length < 6 || repeatPass.length < 6) {
          setValidationError(true);
        } else {
          try {
            const response = await fetch(
              `http://${myContext.serverIP}:8000/users/${myContext.userData.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userData, password: newPass }),
              }
            );
            if (response.ok) {
              setPassChange(true);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              setFailedError(true);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setPassError(true);
      }
    } else {
      setCorrectPassError(true);
    }
  }

  async function changePIN(event) {
    event.preventDefault();

    setPinError(false);
    setPinValidation(false);

    console.log(pinInput, repeatPIN);

    if (pinInput.toString().length !== 4 || repeatPIN.toString().length !== 4) {
      setPinValidation(true);
    } else {
      if (pinInput !== repeatPIN) {
        setPinError(true);
      } else {
        console.log("done!");
        try {
          const response = await fetch(
            `http://${myContext.serverIP}:8000/users/${myContext.userData.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...userData, pin: pinInput, TFA: true }),
            }
          );

          if (response.ok) {
            setPinChange(true);
          } else {
            setFailedError(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  function deleteAccount() {
    if (deletionConfirm === userData.userID) {
      fetch(
        `http://${myContext.serverIP}:8000/users/${myContext.userData.id}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            setFailedError(true);
            throw new Error("Failed to delete the record");
          }
          setAccountDeleted(true);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        })
        .catch((error) => console.error(error));
    } else {
      setDeletionError(true);
    }
  }

  return (
    <Wrapper>
      <section>
        <Container>
          <div className="col-lg-8 nCard my-4 mx-auto">
            <h4 className="mb-4">Account Settings</h4>

            <div className="border p-4 rounded-3">
              <div className="col-lg-6">
                <h6 className="fw-semibold mb-2">
                  Change your account password:
                </h6>
                <form onSubmit={changePassword}>
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-2 ms-1">Current password</p>
                    <input
                      type="text"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="form-control"
                      required
                    />
                    <p
                      className={`text-danger ${
                        correctPassError ? "d-block" : "d-none"
                      }`}
                    >
                      Incorrect password
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-2 ms-1">New password</p>
                    <input
                      type="text"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-2 ms-1">
                      Repeat new password
                    </p>
                    <input
                      type="text"
                      value={repeatPass}
                      onChange={(e) => setRepeatPass(e.target.value)}
                      className="form-control"
                      required
                    />
                    <p
                      className={`text-danger ${
                        validationError ? "d-block" : "d-none"
                      }`}
                    >
                      Password must be atleast 6 characters.
                    </p>
                    <p
                      className={`text-danger ${
                        passError ? "d-block" : "d-none"
                      }`}
                    >
                      Enter same password in both fields.
                    </p>
                  </div>
                  <button type="submit" className="blue-btn rounded py-1 px-2">
                    Update
                  </button>
                </form>
                <div
                  className={`alert alert-danger mt-3 ${
                    failedError ? "d-block" : "d-none"
                  }`}
                  role="alert"
                >
                  An error occurred. Please try again later.
                </div>
                <div
                  className={`alert alert-success mt-3 ${
                    passChange ? "d-block" : "d-none"
                  }`}
                  role="alert"
                >
                  Password changed!
                </div>
              </div>
            </div>

            <div className="my-4 border p-4 rounded-3">
              <h6 className="fw-semibold mb-2">
                Add/Update a 2FA PIN for additional security:
              </h6>
              <div className="col-lg-6">
                <form onSubmit={changePIN}>
                  <Row>
                    <Col lg="6">
                      <div className="mb-3">
                        <p className="fs-6 fw-medium my-2 ms-1">
                          PIN (4 digits)
                        </p>
                        <input
                          type="number"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          className="form-control"
                          value={pinInput}
                          onChange={(e) =>
                            setPinInput(parseInt(e.target.value))
                          }
                        />
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="mb-3">
                        <p className="fs-6 fw-medium my-2 ms-1">Repeat PIN</p>
                        <input
                          type="number"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          className="form-control"
                          value={repeatPIN}
                          onChange={(e) =>
                            setRepeatPIN(parseInt(e.target.value))
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  <p
                    className={`text-danger ${
                      pinValidation ? "d-block" : "d-none"
                    }`}
                  >
                    PIN must be 4-digits only!
                  </p>
                  <p
                    className={`text-danger ${pinError ? "d-block" : "d-none"}`}
                  >
                    PIN doesn't match!
                  </p>
                  <button type="submit" className="blue-btn rounded py-1 px-2">
                    Save
                  </button>
                </form>
                <div
                  className={`alert alert-success mt-3 ${
                    pinChange ? "d-block" : "d-none"
                  }`}
                  role="alert"
                >
                  PIN Changed!
                </div>
                <div
                  className={`alert alert-danger mt-3 ${
                    failedError ? "d-block" : "d-none"
                  }`}
                  role="alert"
                >
                  An error occurred. Please try again later.
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-3 mb-4">
              <div className="col-lg-6">
                <h6 className="fw-semibold text-danger">
                  Delete your account:
                </h6>
                <p className="fw-medium ms-1 mb-2">
                  To confirm, type "{userData.userID}" in the box below
                </p>

                <input
                  type="text"
                  value={deletionConfirm}
                  onChange={(e) => setDeletionConfirm(e.target.value)}
                  className="form-control"
                />
                <p
                  className={`text-danger m-0 ${
                    deletionError ? "d-block" : "d-none"
                  }`}
                >
                  Type given text correctly
                </p>
                <button
                  onClick={deleteAccount}
                  className="red_btn my-3 fw-medium w-100"
                >
                  Delete
                </button>
                <div
                  className={`alert alert-success ${
                    accountDeleted ? "d-block" : "d-none"
                  }`}
                  role="alert"
                >
                  Account deleted successfully!
                  <br />
                  You will be logged out with 5 seconds...
                </div>
                <div
                  className={`alert alert-danger ${
                    failedError ? "d-block" : "d-none"
                  }`}
                  role="alert"
                >
                  An error occurred. Please try again later.
                </div>
              </div>
            </div>

            <div className="alert alert-info" role="alert">
              <ul>
                <li>
                  You will have to enter the PIN each time you are sending
                  CryptoCoins.
                </li>
                <li>
                  All CryptoCoins currently held in your wallet will
                  automatically transfer to the admin if you choose to delete
                  your account.
                </li>
                <li>
                  Please note down account credentials because there is no
                  account recovery option due to security reasons.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Register;
