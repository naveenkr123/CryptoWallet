import React from "react";
import Wrapper from "../Components/Wrapper";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import banner from "../assets/images/banner.svg";
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
              <h2 className="text-light mb-3">What is CryptoWallet?</h2>
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
            <h3 className="text-center">Frequently Asked Questions</h3>
            <div className="d-flex">
              <div className="p-lg-5 mx-auto col-md-10">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>What is CryptoWallet?</Accordion.Header>
                    <Accordion.Body>
                      CryptoWallet is an easy to use browser based Bitcoin
                      wallet. We aim to provide usability and security at the
                      same time.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      Are there any fees on CryptoWallet?
                    </Accordion.Header>
                    <Accordion.Body>
                      We do not charge any fees except for the transaction fees
                      on the bitcoin network.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      Is CryptoWallet easier than the standard bitcoin.org
                      client?
                    </Accordion.Header>
                    <Accordion.Body>
                      CryptoWallet is as simple and easy as possible, we have a
                      very minimalistic interface which should be easy to
                      understand for most people.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      Is it more secure than the standard bitcoin.org client?
                    </Accordion.Header>
                    <Accordion.Body>
                      With the standard bitcoin.org client you will need alot of
                      knowledge about how to protect your wallet.dat file, which
                      is basically impossible for most normal people who do not
                      run multiple PCs, virtualization software, encryption
                      tools etc. Also if you do not do regular backups on the
                      standard client, there is a high risk of loosing your
                      coins. On CryptoWallet we take care of all that,
                      protecting your bitcoin funds while all you have to do is
                      keep your password and optionally transaction PIN in a
                      safe place.{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                      How does CryptoWallet protect my bitcoins?
                    </Accordion.Header>
                    <Accordion.Body>
                      We are using encrypted bitcoin wallets, hard disk
                      encryption, SSL certificates and a hardened webserver for
                      maximum security of your Bitcoins. We also do daily
                      encrypted backups to different offsite locations
                      worldwide. Most bitcoins arent even stored on the
                      webserver, we store them on an impossible to hack offline
                      wallet{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      What happens if i lose my password?
                    </Accordion.Header>
                    <Accordion.Body>
                      Dont lose your password or transaction PIN! We do not have
                      password recovery functions for security reasons. (Most
                      accounts get hacked these days using weak password
                      recovery functions) We recommend you write down your
                      password and if you have it enabled also your transaction
                      PIN on a piece of paper and store it securely.{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>
                      Can i get a new bitcoin address?
                    </Accordion.Header>
                    <Accordion.Body>
                      To keep it simple we only support one address per account,
                      but you are free to open as many accounts as you wish!{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </Container>
        </section>
      </Wrapper>
    </div>
  );
}

export default Home;
