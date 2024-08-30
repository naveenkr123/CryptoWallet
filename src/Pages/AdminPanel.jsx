import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function AdminPanel() {
  const [data, setData] = useState();
  const [searchUID, setSearchUID] = useState("");
  const myContext = useContext(AppContext);
  const navigate = useNavigate();
  const adminData = myContext.userData;

  useEffect(() => {
    if (!adminData || !myContext.loginStatus) {
      navigate("/admin-login");
    }
  }, [adminData, myContext, navigate]);

  async function fetchData() {
    try {
      if (myContext.loginStatus && adminData.admin) {
        const response = await fetch(`http://${myContext.serverIP}:8000/users`);
        const rawData = await response.json();
        setData(rawData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [myContext.loginStatus, adminData, myContext.serverIP]);

  const handleReloadClick = () => {
    window.location.reload();
  };

  return (
    <div className="admin_panel">
      <Navbar
        expand="lg"
        id="loggedin-nav"
        className={`bg-body-tertiary py-2 ${
          myContext.loginStatus ? "d-block" : "d-none"
        }`}
      >
        <Container>
          <Link to="/" className="fw-bold navbar-brand">
            CryptoWallet Admin
          </Link>
          <button onClick={handleReloadClick} className="red_btn px-3 ms-auto">
            <span class="material-symbols-rounded">logout</span>Log Out
          </button>
        </Container>
      </Navbar>

      <div className="body pt-4">
        <Container>
          <div className="nCard">
            <div className="header">
              <h5 className="m-0">User Management</h5>
              <p>Manage CryptoWallet user accounts</p>
              <div className="d-flex justify-content-between mt-4 mb-2">
                <input
                  type="text"
                  className="form-control border-secondary"
                  placeholder="Search user ID"
                  value={searchUID}
                  onChange={(e) => setSearchUID(e.target.value)}
                />
                <button className="primaryBtn px-3" onClick={() => fetchData()}>
                  <span class="material-symbols-rounded">refresh</span>
                  Refresh
                </button>
              </div>
            </div>
            <div className="overflow-x-scroll">
              <table class="table admin_table">
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
                        <td>{item.status}</td>
                        <td>{item.TFA ? "Enabled" : "Disabled"}</td>
                        <td>{item.walletAddress}</td>
                        <td>
                          <button className="more_btn">
                            <span class="material-symbols-rounded">
                              more_vert
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AdminPanel;
