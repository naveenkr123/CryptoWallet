import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState(null); // Add user data state

  return (
    <AppContext.Provider
      value={{ loginStatus, setLoginStatus, userData, setUserData }}
    >
      {children}
    </AppContext.Provider>
  );
};
