import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [serverIP, setServerIP] = useState("13.48.18.172");

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
