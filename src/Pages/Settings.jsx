import React from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";

function Register() {
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
                <div className="mb-3">
                  <p className="fs-6 fw-medium my-2 ms-1">Current password</p>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                  />
                </div>
                <div className="mb-3">
                  <p className="fs-6 fw-medium my-2 ms-1">New password</p>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                  />
                </div>
                <div className="mb-3">
                  <p className="fs-6 fw-medium my-2 ms-1">
                    Repeat new password
                  </p>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                  />
                </div>
                <button className="blue-btn rounded py-1 px-2 mb-3">
                  Update
                </button>
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
