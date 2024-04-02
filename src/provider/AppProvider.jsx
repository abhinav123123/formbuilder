import React from "react";
import StoreProvider from "./StoreProvider";
import LocaleProvider from "./LocaleProvider";
import DndAppProvider from "./DndAppProvider";
const AppProvider = ({ children }) => {
  return (
    <LocaleProvider>
      <DndAppProvider>
        <StoreProvider>
        {children}
        </StoreProvider>
      </DndAppProvider>
    </LocaleProvider>
  );
};

export default AppProvider;
