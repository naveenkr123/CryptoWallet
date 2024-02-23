import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary py-3">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Crypto<span style={{ color: "#072541" }}>Wallet</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center">
            <NavLink className="nav-link" to="/account">
              Wallet
            </NavLink>
            <NavLink className="nav-link" to="/transfer">
              Transfer
            </NavLink>
            <NavLink className="nav-link" to="/settings">
              Notifications( 2 )
            </NavLink>
            <NavLink className="nav-link" to="/settings">
              Settings
            </NavLink>
            <NavLink className="nav-link" to="/faq">
              FAQ
            </NavLink>
          </Nav>

          <Link className="nav-link" to="/login">
            <button className="login-btn blue-btn bg-light text-black border border-2 me-2 py-1 px-3">
              Log In
            </button>
          </Link>
          <Link className="nav-link" to="/register">
            <button className="blue-btn py-1 px-3 mt-2 mt-lg-0">Sign Up</button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
