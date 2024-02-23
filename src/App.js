import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import FAQ from "./Pages/FAQ";
import Transfer from "./Pages/Transfer";
import Settings from "./Pages/Settings";
import Notifications from "./Pages/Notifications";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Notifications" element={<Notifications />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
