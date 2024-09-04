import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";
import Notification from "../Components/Notification";

function Notifications() {
  const [liveData, setLiveData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false); // Flag for data loading
  const myContext = useContext(AppContext);
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData")) || "";

  // Redirect to login if userData is not available
  useEffect(() => {
    const isAuthenticated =
      sessionStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!dataLoaded) {
      async function fetchUserData() {
        try {
          const response = await fetch(
            `http://${myContext.serverIP}:8000/users?userID=${userData.userID}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          const rawData = await response.json();
          setLiveData(rawData[0]);
          await fetch(
            `http://${myContext.serverIP}:8000/users/${rawData[0].id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...rawData[0], isNotification: true }),
            }
          );
          setDataLoaded(true); // Set flag to true once data is loaded
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      fetchUserData();
    }
  }, [userData, myContext.serverIP, dataLoaded]); // Include dataLoaded in dependencies

  useEffect(() => {
    async function readNotification() {
      try {
        const res = await fetch(
          `http://${myContext.serverIP}:8000/users?walletAddress=${userData.walletAddress}`
        );
        const liveData = await res.json();
        await fetch(
          `http://${myContext.serverIP}:8000/users/${liveData[0].id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...liveData[0],
              isNotification: false,
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    if (userData) {
      readNotification();
    }
  }, [userData, myContext.serverIP]); // Run when dependencies change

  return (
    <Wrapper>
      <section>
        <Container>
          <div className="col-lg-8 p-3 nCard my-4 mx-auto overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0">Notifications</h5>
              <button className="red_btn px-3">Delete all</button>
            </div>

            <div className="notification_wrapper">
              {liveData?.notifications
                .slice()
                .reverse()
                .map((item, index) => (
                  <Notification
                    subject={item.subject}
                    date={item.date}
                    content={item.content}
                    key={index}
                  />
                ))}
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Notifications;
