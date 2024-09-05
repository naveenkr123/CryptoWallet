import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import avatar from "../assets/images/user.png";

function AdminPanel() {
  const [data, setData] = useState();
  const [searchUID, setSearchUID] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // Flag for data loading
  const navigate = useNavigate();
  const adminData = JSON.parse(sessionStorage.getItem("userData")) || "";
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // redirect to admin login page if user is not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [navigate, isAuthenticated]);

  // fetch all users data for dashboard
  const fetchData = useCallback(async () => {
    try {
      if (isAuthenticated && adminData && !dataLoaded) {
        const response = await fetch(process.env.REACT_APP_ALL_USERS_DATA);
        const rawData = await response.json();
        setData(rawData);
        setDataLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [isAuthenticated, adminData, dataLoaded]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleViewCredentials = (user) => {
    setSelectedUser(user);
    handleShow2();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("isAuthenticated");
    navigate("/admin-login");
  };

  return (
    <div className="admin_panel">
      <Navbar
        expand="lg"
        id="loggedin-nav"
        className={`bg-body-tertiary py-2 ${adminData ? "d-block" : "d-none"}`}
      >
        <Container>
          <Link to="/" className="fw-bold navbar-brand">
            CryptoWallet Admin
          </Link>
          <div className="d-flex">
            <button onClick={handleShow} className="nav_avatar me-4">
              AD
            </button>
            <button onClick={handleLogout} className="red_btn px-3 ms-auto">
              <span class="material-symbols-rounded">logout</span>Log Out
            </button>
          </div>
        </Container>
      </Navbar>

      <div className="body pt-4">
        <Container>
          <div className="nCard px-3 px-md-4">
            <div className="header mb-4">
              <h5 className="m-0">User Management</h5>
              <p>Manage CryptoWallet user accounts</p>
              <div className="d-flex flex-column flex-md-row gap-2 gap-lg-3 justify-content-between mt-4 mb-2">
                <input
                  type="text"
                  className="form-control border-secondary"
                  placeholder="Search user ID"
                  value={searchUID}
                  onChange={(e) => setSearchUID(e.target.value)}
                />
                <button
                  className="primaryBtn px-3 ms-auto"
                  onClick={() => fetchData()}
                >
                  <span class="material-symbols-rounded">
                    notifications_active
                  </span>
                  Send Notification
                </button>
                <button className="primaryBtn px-3" onClick={() => fetchData()}>
                  <span class="material-symbols-rounded">refresh</span>
                  Refresh
                </button>
              </div>
            </div>
            <div className="overflow-auto">
              <table class="table table-responsive admin_table">
                <thead>
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">Last Login</th>
                    <th scope="col" className="text-end">
                      Balance (₿)
                    </th>
                    <th scope="col">Status</th>
                    <th scope="col">2FA</th>
                    <th scope="col">Wallet Address</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ?.reverse()
                    .filter(
                      (item) =>
                        searchUID === "" || item.userID.includes(searchUID)
                    )
                    .map((item) => (
                      <tr key={item.id}>
                        <td>{item.userID}</td>
                        <td>{item.lastLogin}</td>
                        <td className="text-end">{item.balance}</td>
                        <td style={{ color: "rgb(34, 255, 0)" }}>
                          {item.status}
                        </td>
                        <td>{item.TFA ? "Enabled" : "Disabled"}</td>
                        <td>{item.walletAddress}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle className="p-0 bg-transparent border-0">
                              <button
                                className="more_btn dropdown-toggle"
                                id="dropdown-basic"
                              >
                                <span class="material-symbols-rounded">
                                  more_vert
                                </span>
                              </button>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <span class="material-symbols-outlined">
                                  lock
                                </span>
                                Reset Password
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <span class="material-symbols-outlined">
                                  notifications
                                </span>
                                Send Notification
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <span class="material-symbols-outlined">
                                  block
                                </span>
                                Suspend Account
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <span class="material-symbols-outlined">
                                  delete
                                </span>
                                Delete Account
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleViewCredentials(item)}
                              >
                                <span class="material-symbols-outlined">
                                  account_circle
                                </span>
                                View Details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>

      <Modal
        className="adminPanelModal"
        show={show}
        size="sm"
        onHide={handleClose}
        centered
      >
        <Modal.Body>
          <div className="d-flex">
            <img src={avatar} className="mx-auto" alt="img" height={"80px"} />
          </div>
          <div className="adminDetails">
            <h6>{adminData.adminID}</h6>
            <p>{adminData.walletAddress}</p>

            <div className="d-flex align-items-center justify-content-center">
              <span class="material-symbols-outlined">currency_bitcoin</span>
              <h2 className="m-0">{adminData.balance}</h2>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        className="adminPanelModal"
        show={show2}
        onHide={handleClose2}
        centered
        size="sm"
      >
        <Modal.Body>
          <h6 className="text-center">User Details</h6>
          <div className="d-flex py-3">
            <img src={avatar} className="mx-auto" alt="img" height={"80px"} />
          </div>

          <div className="topBox">
            <h6>{selectedUser?.userID}</h6>
            <p>{selectedUser?.walletAddress}</p>
          </div>

          {selectedUser && (
            <div className="userDetails">
              <Row>
                <Col xs={6}>
                  <div className="dataBox">
                    <label>Balance (BTC)</label>
                    <span>{selectedUser?.balance}</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="dataBox">
                    <label>2FA</label>
                    <span>{selectedUser?.TFA ? "Enabled" : "Disabled"}</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="dataBox">
                    <label>Status</label>
                    <span style={{ color: "rgb(34, 255, 0)" }}>
                      {selectedUser?.status}
                    </span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="dataBox">
                    <label>Role</label>
                    <span>{selectedUser?.role}</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="dataBox">
                    <label>Joining Date</label>
                    <span>{selectedUser?.joiningDate}</span>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="dataBox">
                    <label>Last Login</label>
                    <span>{selectedUser?.lastLogin}</span>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminPanel;
