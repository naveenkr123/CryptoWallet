import React from "react";
import bell from "../assets/images/bell.png";

function Notification({ subject, date, content }) {
  return (
    <div className="notification p-2">
      <div className="d-flex">
        <div className="bell">
          <img src={bell} alt="img" />
        </div>
        <div>
          <h6>{subject}</h6>
          <span>{date}</span>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
