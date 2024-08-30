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
                <button className="primaryBtn bg-light text-black rounded me-2 py-2 px-4">
                  Log In
                </button>
              </Link>
              <Link className="nav-link" to="/register">
                <button className="primaryBtn py-2 px-4 mt-2 mt-lg-0 rounded">
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

          <div className="d-flex ms-auto">
            <NavLink
              className="nav-link notification_opt d-block d-lg-none"
              to="/notifications"
            >
              {myContext.userData?.isNotification && (
                <span className="notify_dot"></span>
              )}
              <span class="material-symbols-rounded nav_icon me-1">
                notifications
              </span>
            </NavLink>
            <NavLink className="nav-link d-block d-lg-none" to="/settings">
              <span class="material-symbols-rounded nav_icon me-1">
                settings
              </span>
            </NavLink>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-lg-5 me-auto text-center">
              <NavLink className="nav-link" to="/wallet">
                Wallet
              </NavLink>
              <NavLink className="nav-link" to="/transfer">
                Transfer
              </NavLink>
              <NavLink className="nav-link" to="/transactions">
                Transactions
              </NavLink>
            </Nav>

            <NavLink
              className="nav-link notification_opt d-none d-lg-block"
              to="/notifications"
            >
              {myContext.userData?.isNotification && (
                <span className="notify_dot"></span>
              )}
              <span class="material-symbols-rounded nav_icon">
                notifications
              </span>
            </NavLink>
            <NavLink className="nav-link d-none d-lg-block" to="/settings">
              <span class="material-symbols-rounded nav_icon">settings</span>
            </NavLink>

            <button className="red_btn px-3" onClick={handleReloadClick}>
              <span class="material-symbols-rounded">logout</span> Log Out
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
