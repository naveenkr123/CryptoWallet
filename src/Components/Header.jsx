import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Pricing</Nav.Link>
            <Nav.Link href="#link">Blogs</Nav.Link>
            <NavLink className="nav-link" to="/faq">
              FAQ
            </NavLink>
            <NavLink className="nav-link" to="/account">
              My Account
            </NavLink>
          </Nav>

          <Link to="/login">
            <button className="blue-btn bg-light text-black border border-2 me-2 py-1 px-3">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="blue-btn py-1 px-3">Sign Up</button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
