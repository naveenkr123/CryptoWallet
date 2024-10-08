import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

function Header() {
  const userData = JSON.parse(sessionStorage.getItem("userData")) || "";
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const firstLetter = userData?.userID?.charAt(0).toUpperCase() || "";
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        id="default-nav"
        className={`bg-body-tertiary py-2 border ${
          isAuthenticated ? "d-none" : "d-block"
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
          isAuthenticated ? "d-block" : "d-none"
        }`}
      >
        <Container>
          <Link to="/" className="fw-bold navbar-brand">
            CryptoWallet
          </Link>

          <div className="d-flex d-block d-lg-none ms-auto">
            <NavLink className="nav-link notification_opt" to="/notifications">
              {userData?.isNotification && <span className="notify_dot"></span>}
              <span class="material-symbols-rounded nav_icon me-1">
                notifications
              </span>
            </NavLink>
            <NavLink className="nav-link" to="/settings">
              <span class="material-symbols-rounded nav_icon me-1">
                settings
              </span>
            </NavLink>
            <button className="nav_avatar my-auto">{firstLetter}</button>
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

            <div className="d-none d-lg-block">
              <div className="d-flex">
                <NavLink
                  className="nav-link notification_opt"
                  to="/notifications"
                >
                  {userData?.isNotification && (
                    <span className="notify_dot"></span>
                  )}
                  <span class="material-symbols-rounded nav_icon me-2">
                    notifications
                  </span>
                </NavLink>
                <NavLink className="nav-link" to="/settings">
                  <span class="material-symbols-rounded nav_icon">
                    settings
                  </span>
                </NavLink>
                <button className="nav_avatar me-4 my-auto">
                  {firstLetter}
                </button>
              </div>
            </div>

            <button className="red_btn px-3" onClick={handleLogout}>
              <span class="material-symbols-rounded">logout</span> Log Out
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
