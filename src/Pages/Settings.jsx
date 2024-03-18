import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";

function Register() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [passError, setPassError] = useState(false);
  const [correctPassError, setCorrectPassError] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [failedError, setFailedError] = useState(false);
  const [passChange, setPassChange] = useState(false);

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
              `http://localhost:8000/users/${myContext.userData.id}`,
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

  return (
    <Wrapper>
      <section>
        <Container>
          <div className="col-lg-10 border border-2 rounded p-3 p-md-4 my-5 mx-auto">
            <h4 className="mb-3">Account Settings</h4>
            <hr />

            <div className=" my-4">
              <h5 className="fw-semibold mb-3">Change password:</h5>
              <div className="col-lg-6">
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
                  </div>
                  <div
                    className={`alert alert-danger ${
                      passError ? "d-block" : "d-none"
                    }`}
                    id="change-pass"
                    role="alert"
                  >
                    Enter same password in both fields.
                  </div>
                  <button
                    type="submit"
                    className="blue-btn rounded py-1 px-2 mb-3"
                  >
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

            <div>
              <h5 className="fw-semibold mb-3">
                Add a transaction PIN for additional security:
              </h5>
              <div className="col-lg-6">
                <div className="mb-3">
                  <p className="fs-6 fw-medium my-2 ms-1">PIN (4 digits)</p>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                  />
                </div>
                <div className="mb-3">
                  <p className="fs-6 fw-medium my-2 ms-1">Repeat PIN</p>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                  />
                </div>
                <button className="blue-btn rounded py-1 px-2 mb-5">
                  Save
                </button>
              </div>
            </div>

            <div className="alert alert-info" role="alert">
              You will have to enter the PIN each time you are sending
              CryptoCoins.
            </div>

            <div className="alert alert-warning" role="alert">
              Warning! Please note down account credentials because there is no
              account recovery option due to security reasons.
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Register;
