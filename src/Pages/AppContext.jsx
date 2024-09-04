import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [serverIP, setServerIP] = useState("10.5.51.182");

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
