import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState(null); // Add user data state
  const [serverIP, setServerIP] = useState("13.50.13.237");

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
