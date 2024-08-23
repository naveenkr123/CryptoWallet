import React from "react";
import bell from "../assets/images/bell.png";

function Notification() {
  return (
    <div className="notification">
      <div className="d-flex">
        <div className="bell">
          <img src={bell} alt="img" />
        </div>
        <div>
          <h6>Subject heading</h6>
          <span>1 hr ago</span>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
            expedita nobis obcaecati, delectus rerum sunt, cum neque, quod minus
            et molestias. Pariatur facere voluptatum earum praesentium sunt
            alias accusantium modi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
