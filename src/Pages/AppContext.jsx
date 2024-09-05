import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [serverIP, setServerIP] = useState("192.168.1.3");

  return (
    <AppContext.Provider
      value={{
        serverIP,
        setServerIP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
