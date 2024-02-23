import React from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";

function Transfer() {
  return (
    <Wrapper>
      <section className="py-5">
        <Container>
          <div className="w-100 h-100 py-5 p-md-5">
            <div className="login-div mx-auto pb-5 col-lg-6">
              <h2 className="text-center fw-bold">
                Crypto<span style={{ color: "#072541" }}>Wallet</span>
              </h2>
              <h5 className="text-center fw-semibold mt-2 mb-5">
                Transfer CryptoCoins
              </h5>
              <div className="mb-3">
                <p className="fs-6 fw-medium my-2 ms-1">Wallet Address</p>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                />
              </div>
              <div className="mb-4">
                <p className="fs-6 fw-medium my-2 ms-1">Amount</p>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                />
              </div>
              <button className="blue-btn rounded w-100 py-2 px-3">
                Transfer
              </button>

              <div className="alert alert-success my-4" role="alert">
                Transferred Successfully!
              </div>
              <div className="alert alert-danger my-4" role="alert">
                Transfer failed!
                <br />
                Wallet address is not found.
              </div>
              <div className="alert alert-info my-4" role="alert">
                Transaction fee depends on network load, 0.0005 Bitcoins from
                your balance will be reserved for fees.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Transfer;
