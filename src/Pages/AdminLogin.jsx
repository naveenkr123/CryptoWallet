import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import admin_logo from "../assets/images/admin-panel.png";

function AdminLogin() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [userRecord, setUserRecord] = useState({});
  const [pin, setPIN] = useState("");
  const [TFA_active, setTFA_active] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authError, setAuthError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const myContext = useContext(AppContext);
  const navigate = useNavigate();

  function authentication(event) {
    event.preventDefault();

    if (pin === userRecord.pin) {
      myContext.setLoginStatus(true);
      myContext.setUserData(userRecord);
      navigate("/admin-panel");
    } else {
      setAuthError(true);
    }
  }

  async function verifyAccount(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://${myContext.serverIP}:8000/admins?adminID=${userID}`
      );
      const userData = await response.json();
      // console.log("log", userData[0]);
      if (userData.length === 0) {
        setErrorMessage("Account not found!");
      } else {
        const user = userData[0];
        setUserRecord(userData[0]);

        if (password === user.password) {
          if (user.TFA) {
            setTFA_active(true);
          } else {
            myContext.setLoginStatus(true);
            myContext.setUserData(userData[0]);
            navigate("/admin-panel");
          }
        } else {
          setErrorMessage("Incorrect password!");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="admin_wrapper">
      <div className="login_card">
        <img src={admin_logo} alt="admin" />
        <h5 className="text-center fw-semibold mb-4">CryptoWallet Admin</h5>

        <form onSubmit={verifyAccount}>
          <div className="mb-2">
            <label htmlFor="loginID">Admin ID</label>
            <input
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              type="text"
              className="form-control"
              id="loginID"
              aria-describedby="emailHelp"
              placeholder=""
              required
            />
          </div>
          <label htmlFor="loginPass">Password</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="loginPass"
              aria-describedby="emailHelp"
              placeholder=""
              required
            />
            <button
              type="button"
              className="eye_btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <span class="material-symbols-rounded">visibility</span>
              ) : (
                <span class="material-symbols-rounded">visibility_off</span>
              )}
            </button>
          </div>
          <button
            type="submit"
            className={`primaryBtn rounded w-100 py-2 px-3 mt-4 ${
              TFA_active ? "d-none" : "d-block"
            }`}
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={authentication}>
          <div className={`mt-2 ${TFA_active ? "d-block" : "d-none"}`}>
            <label>PIN (2FA)</label>
            <input
              value={pin}
              onChange={(e) => setPIN(parseInt(e.target.value))}
              type="password"
              pattern="[0-9]*"
              inputMode="numeric"
              className="form-control"
              id="loginPIN"
              required
            />
            <p
              className={`text-danger m-0 ${authError ? "d-block" : "d-none"}`}
            >
              Incorrect PIN
            </p>
            <button type="submit" className="primaryBtn py-2 mt-3 w-100">
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
