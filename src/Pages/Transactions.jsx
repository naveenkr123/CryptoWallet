import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../Components/Wrapper";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AppContext } from "./AppContext";
import debitIcon from "../assets/images/arrowup.svg";
import creditIcon from "../assets/images/arrowdown.svg";

function Transactions() {
  const [liveData, setLiveData] = useState();
  const [filterType, setFilterType] = useState("all");
  const [searchTxnID, setSearchTxnID] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // Flag for data loading

  const myContext = useContext(AppContext);
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData")) || "";

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
            `http://${myContext.serverIP}:8000/users?walletAddress=${userData.walletAddress}`
          );
          const rawData = await response.json();
          setLiveData(rawData[0]);
          setDataLoaded(true); // Set flag to true once data is loaded
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      fetchUserData();
    }
  }, [userData, myContext.serverIP, dataLoaded]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    if (value === "1") {
      setFilterType("all");
    } else if (value === "2") {
      setFilterType("debit");
    } else if (value === "3") {
      setFilterType("credit");
    }
  };

  return (
    <Wrapper>
      <Container>
        <div className="nCard mt-4 p-3 p-md-4 mb-5 overflow-hidden">
          <div className="tHeader gap-3 flex-column flex-md-row">
            <h5 className="m-0">Transactions</h5>
            <div className="d-flex justify-content-end flex-column flex-md-row gap-3 w-100">
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control rounded-end-0"
                  placeholder="Search with Txn ID"
                  value={searchTxnID}
                  onChange={(e) => setSearchTxnID(e.target.value)}
                />
                <button
                  className="btn btn-dark bg-black rounded-start-0"
                  onClick={() => setSearchTxnID(searchTxnID.trim())}
                >
                  Search
                </button>
              </div>
              <Form.Select
                aria-label="Default select example"
                onChange={handleFilterChange}
              >
                <option value="1">All</option>
                <option value="2">Debit</option>
                <option value="3">Credit</option>
              </Form.Select>
            </div>
          </div>

          <div className="overflow-x-scroll mt-4 rounded">
            <table className="table table-hover transaction_table">
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
                {liveData?.transactions
                  .slice()
                  .reverse()
                  .filter(
                    (item) =>
                      (filterType === "all" || item.type === filterType) &&
                      (searchTxnID === "" ||
                        item.transactionID.includes(searchTxnID))
                  )
                  .map((item) => (
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
            {liveData?.transactions?.length === 0 && (
              <p className="text-center text-secondary">No data found!</p>
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Transactions;
