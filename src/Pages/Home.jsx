import React from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row } from "react-bootstrap";
import banner from "../images/banner.svg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Wrapper>
        <section className="py-4">
          <Container>
            <Row className="hero-sec">
              <Col lg="7">
                <div className="h-100 mt-3 d-flex flex-column justify-content-center">
                  <div>
                    <h1 className="fw-bold m-0">
                      Secure, Seamless <br />
                      Gateway to Cryptocurrency
                    </h1>
                    <p className="mt-3 mb-4 sub-head">
                      Safely store, manage, and trade your digital assets with
                      confidence
                    </p>
                    <Link to="/register">
                      <button className="blue-btn">START NOW</button>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg="5">
                <div className="ratio ratio-1x1">
                  <img src={banner} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section
          className="why-sec py-5 text-center"
          style={{ backgroundColor: "#072541" }}
        >
          <Container>
            <div className="px-md-5">
              <h2 className="text-light pb-3">What is CryptoWallet?</h2>
              <p className="text-light">
                CryptWallet, your premier online cryptocurrency wallet platform,
                offers a seamless and secure solution for managing your digital
                assets. With cutting-edge encryption technology, we prioritize
                the safety of your funds, providing peace of mind in an
                ever-evolving digital landscape. Our intuitive interface ensures
                effortless navigation, empowering users to effortlessly send,
                receive, and store various cryptocurrencies with ease. Whether
                you're a seasoned trader or a newcomer to the world of digital
                currencies, CryptWallet caters to all levels of expertise,
                offering comprehensive tools and resources to support your
                financial endeavors. Join us today and unlock the full potential
                of your crypto journey.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            <h2 className="text-center pb-5">Why choose CryptoWallet?</h2>
            <div>
              <Row>
                <Col lg="6">
                  <div
                    className="p-4 rounded text-light mb-4"
                    style={{ backgroundColor: "#072541" }}
                  >
                    <h5
                      className="text-center mb-3"
                      style={{ color: "#00ED64" }}
                    >
                      Secure Wallet Storage
                    </h5>
                    <p className="lh-base">
                      Advanced Encryption: Utilize cutting-edge encryption
                      protocols to safeguard your digital assets. Multi-factor
                      Authentication: Add an extra layer of security with
                      multi-factor authentication methods like biometrics or
                      OTP. Offline Cold Storage: Protect your funds from online
                      threats by storing them securely offline.
                    </p>
                  </div>
                </Col>
                <Col lg="6">
                  <div
                    className="p-4 rounded text-light mb-4"
                    style={{ backgroundColor: "#072541" }}
                  >
                    <h5
                      className="text-center mb-4"
                      style={{ color: "#00ED64" }}
                    >
                      User-Friendly Interface
                    </h5>
                    <p>
                      Intuitive Design: Navigate through your wallet
                      effortlessly with a user-friendly interface. Customizable
                      Dashboard: Tailor your dashboard to display the
                      information that matters most to you. Seamless
                      Transactions: Execute transactions quickly and easily with
                      a streamlined process.
                    </p>
                  </div>
                </Col>
                <Col lg="6">
                  <div
                    className="p-4 rounded text-light mb-4"
                    style={{ backgroundColor: "#072541" }}
                  >
                    <h5
                      className="text-center mb-4"
                      style={{ color: "#00ED64" }}
                    >
                      24/7 Customer Support
                    </h5>
                    <p>
                      Dedicated Assistance: Access round-the-clock support from
                      a team of knowledgeable experts. Live Chat: Receive
                      immediate assistance through our live chat feature for any
                      urgent queries. Comprehensive FAQs: Find answers to common
                      questions and troubleshooting tips in our extensive FAQ
                      section.
                    </p>
                  </div>
                </Col>
                <Col lg="6">
                  <div
                    className="p-4 rounded mb-4"
                    style={{ backgroundColor: "#072541" }}
                  >
                    <h5
                      className="text-center mb-4"
                      style={{ color: "#00ED64" }}
                    >
                      Integration with Popular Cryptocurrencies{" "}
                    </h5>
                    <p className="text-light">
                      Extensive Coin Support: Seamlessly manage a wide range of
                      cryptocurrencies within a single wallet. Cross-Platform
                      Compatibility: Access your wallet from various devices and
                      operating systems without limitations. Real-Time Updates:
                      Stay informed about the latest developments and prices of
                      your favorite cryptocurrencies.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </Wrapper>
    </div>
  );
}

export default Home;
