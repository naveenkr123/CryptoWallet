import React, { useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");

  // Function to handle text input change
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter text"
      />
      <br />
      {text && <QRCode value={text} />}
    </div>
  );
};

export default QRCodeGenerator;
