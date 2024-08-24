import { useContext } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../Pages/AppContext";

function Header() {
  const myContext = useContext(AppContext);

  const handleReloadClick = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar
        expand="lg"
        id="default-nav"
        className={`bg-body-tertiary py-2 border ${
          myContext.loginStatus ? "d-none" : "d-block"
        }`}
      >
        <Container>
          <Link to="/" className="fw-bold navbar-brand">
            CryptoWallet
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="nav-btn-cont py-3 py-lg-0">
              <Link className="nav-link" to="/login">
                <button className="login-btn blue-btn bg-light text-black border border-2 me-2 py-1 px-3">
                  Log In
                </button>
              </Link>
              <Link className="nav-link" to="/register">
                <button className="blue-btn py-1 px-3 mt-2 mt-lg-0">
                  Sign Up
                </button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar
        expand="lg"
        id="loggedin-nav"
        className={`bg-body-tertiary border-bottom py-2 ${
          myContext.loginStatus ? "d-block" : "d-none"
        }`}
      >
        <Container>
          <Link to="/" className="fw-bold navbar-brand">
            CryptoWallet
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center">
              <NavLink className="nav-link" to="/wallet">
                Wallet
              </NavLink>
              <NavLink className="nav-link" to="/transfer">
                Transfer
              </NavLink>
              <NavLink className="nav-link" to="/transactions">
                Transactions
              </NavLink>
              <NavLink
                className="nav-link notification_opt"
                to="/notifications"
              >
                <span className="notify_dot"></span>
                Notifications
              </NavLink>
              <NavLink className="nav-link" to="/settings">
                Settings
              </NavLink>
            </Nav>
            <div className="d-flex">
              <button
                className="red_btn fw-medium py-1 px-3 rounded-pill"
                onClick={handleReloadClick}
              >
                Log Out
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
