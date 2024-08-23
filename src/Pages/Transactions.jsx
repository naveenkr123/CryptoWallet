import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";
import debitIcon from "../assets/images/arrowup.svg";
import creditIcon from "../assets/images/arrowdown.svg";

function Transactions() {
  const [liveData, setLiveData] = useState();
  const myContext = useContext(AppContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const userData = myContext.userData;

  // Redirect to login if userData is not available
  useEffect(() => {
    if (!userData || !myContext.loginStatus) {
      navigate("/login");
    }
  }, [userData, myContext, navigate]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (myContext.loginStatus && userData) {
          const response = await fetch(
            `http://${myContext.serverIP}:8000/users?walletAddress=${userData.walletAddress}`
          );
          const rawData = await response.json();
          setLiveData(rawData[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [myContext.loginStatus, userData, myContext.serverIP]);

  //   useEffect(() => {
  //     console.log("Live Data", liveData);
  //   }, [liveData]);

  console.log(liveData);

  return (
    <Wrapper>
      <Container>
        <div className="nCard mt-4 p-3 p-md-4 mb-5 overflow-hidden">
          <div className="tHeader gap-3 flex-column flex-md-row">
            <h5 className="m-0">Transactions</h5>
            <div className="d-flex justify-content-end flex-column flex-md-row gap-3 w-100">
              <div className="d-flex">
                <input
                  type="email"
                  class="form-control rounded-end-0"
                  placeholder="Search with Txn ID"
                />
                <button className="btn btn-primary rounded-start-0">
                  Search
                </button>
              </div>
              <Form.Select aria-label="Default select example">
                <option>Filter</option>
                <option value="1">All</option>
                <option value="2">Debit</option>
                <option value="3">Credit</option>
              </Form.Select>
            </div>
          </div>

          <div className="overflow-x-scroll mt-4 rounded">
            <table class="table table-hover transaction_table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Date</th>
                  <th scope="col">Txn ID</th>
                  <th scope="col">Amount (₿)</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Sender Wallet Address</th>
                  <th scope="col">Sender ID</th>
                  <th scope="col">Recipient Wallet Address</th>
                  <th scope="col">Recipient ID</th>
                </tr>
              </thead>
              <tbody>
                {liveData?.transactions.map((item) => (
                  <tr key={item?.transactionID}>
                    <td>
                      {item?.type === "debit" ? (
                        <img
                          src={debitIcon}
                          alt="img"
                          width={"20px"}
                          height={"20px"}
                        />
                      ) : (
                        <img
                          src={creditIcon}
                          alt="img"
                          width={"20px"}
                          height={"20px"}
                        />
                      )}
                    </td>
                    <td>{item?.date}</td>
                    <td>{item?.transactionID}</td>
                    <td className="text-end">{item?.amount}</td>
                    <td>{item?.type}</td>
                    <td className="text-success">{item?.status}</td>
                    <td>{item?.senderWA}</td>
                    <td>{item?.senderUID}</td>
                    <td>{item?.recipientWA}</td>
                    <td>{item?.recipientUID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Transactions;
