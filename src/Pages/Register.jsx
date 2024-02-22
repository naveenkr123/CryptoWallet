import React from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Wrapper>
      <section>
        <Container>
          <div className="w-100 h-100 py-5 p-md-5">
            <div className="col-lg-8 login-div mx-auto pb-5">
              <h2 className="text-center fw-bold">
                Crypto<span style={{ color: "#072541" }}>Wallet</span>
              </h2>
              <h5 className="text-center fw-semibold mt-2 mb-5">
                Create new account
              </h5>
              <Row>
                {/* <Col lg="6">
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-2 ms-1">Firstname</p>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-2 ms-1">Lastname</p>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                  </div>
                </Col> */}
                <Col lg="12">
                  <div className="mb-3">
                    <p className="fs-6 fw-medium my-2 ms-1">Create User ID</p>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="mb-4">
                    <p className="fs-6 fw-medium my-2 ms-1">Password</p>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="mb-4">
                    <p className="fs-6 fw-medium my-2 ms-1">Repeat Password</p>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                  </div>
                </Col>
              </Row>

              <button className="blue-btn rounded w-100 py-2 px-3">
                Login
              </button>

              <p className="text-center my-4">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Log in
                </Link>
              </p>
              <div className="alert alert-warning" role="alert">
                Warning! Please note down account credentials because there is
                no account recovery option due to security reasons.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Register;
