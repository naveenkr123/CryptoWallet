import React from "react";
import Wrapper from "../Components/Wrapper";
import { Container } from "react-bootstrap";

function Notifications() {
  return (
    <Wrapper>
      <section>
        <Container>
          <div className="col-lg-10 border border-2 rounded p-3 p-md-4 my-5 mx-auto">
            <h4 className="mb-3 text-center">Notifications</h4>
            <hr />
            <button className="blue-btn rounded py-1 px-2 mb-3">
              Delete all
            </button>
            <div className="alert alert-primary" role="alert">
              <h6>Security updates</h6>
              <p className="m-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium dolor inventore earum nisi incidunt quidem nulla,
                soluta quasi error, libero amet ut expedita aliquid eveniet
                sequi porro animi, neque repellendus.
              </p>
            </div>
            <div className="alert alert-primary" role="alert">
              <h6>Transaction update</h6>
              <p className="m-0">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Corrupti corporis aut dicta porro consectetur quos iusto minima
                iure. Quidem dolor dolore.
              </p>
            </div>
            <div className="alert alert-primary" role="alert">
              <h6>Bitcoin Received</h6>
              <p className="m-0">
                You will have to enter the PIN each time you are sending
                CryptoCoins.
              </p>
            </div>
            <div className="alert alert-primary" role="alert">
              <h6>Welcome!</h6>
              <p className="m-0">
                Hello John Doe, Welcome to CryptoWallet.
                <br />
              </p>
            </div>
          </div>
        </Container>
      </section>
    </Wrapper>
  );
}

export default Notifications;
