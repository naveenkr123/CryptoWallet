import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [serverIP, setServerIP] = useState("10.5.51.182");

  return (
    <AppContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        userData,
        setUserData,
        serverIP,
        setServerIP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
