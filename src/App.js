import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Transfer from "./Pages/Transfer";
import Transactions from "./Pages/Transactions";
import Settings from "./Pages/Settings";
import Notifications from "./Pages/Notifications";
import Wallet from "./Pages/Wallet";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";

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
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin-panel" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
