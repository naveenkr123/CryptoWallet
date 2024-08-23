import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Transfer from "./Pages/Transfer";
import Transactions from "./Pages/Transactions";
import Settings from "./Pages/Settings";
import Notifications from "./Pages/Notifications";
import Wallet from "./Pages/Wallet";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Notifications" element={<Notifications />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
