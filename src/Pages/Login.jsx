import React from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Wrapper>
      <section>
        <Container>
          <div className="w-100 h-100 py-5 p-md-5">
            <div className="login-div mx-auto pb-5" style={{ width: "300px" }}>
              <h2 className="text-center fw-bold">
                Crypto<span style={{ color: "#072541" }}>Wallet</span>
              </h2>
              <h5 className="text-center fw-semibold mt-2 mb-5">
                Login to your account
              </h5>
              <p className="fs-6 fw-medium my-2 ms-1">User ID</p>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                />
              </div>
              <div className="mb-4">
                <p className="fs-6 fw-medium my-2 ms-1">Password</p>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                />
              </div>
              <button className="blue-btn rounded w-100 py-2 px-3">
                Login
              </button>

              <p className="text-center my-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-decoration-none">
                  Click here
                </Link>
              </p>
              <div className="alert alert-warning" role="alert">
                Warning! There is no password recovery option due to security
                reasons.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Login;
