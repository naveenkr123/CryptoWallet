import React, { useContext, useEffect } from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";
import Notification from "../Components/Notification";

function Notifications() {
  const status = useContext(AppContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const userData = status.userData;

  // console.log("context", status);

  // Redirect to login if userData is not available
  useEffect(() => {
    if (!userData || !status.loginStatus) {
      navigate("/login");
    }
  }, [userData, status, navigate]);

  // Render loading or nothing until redirected
  if (!userData || !status.loginStatus) {
    return null;
  }

  return (
    <Wrapper>
      <section>
        <Container>
          <div className="col-lg-8 nCard my-4 mx-auto overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0">Notifications</h5>
              <button className="red_btn">Delete all</button>
            </div>

            <div className="notification_wrapper">
              <Notification />
              <Notification />
              <Notification />
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Notifications;
