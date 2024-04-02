
import React from "react";
import store from "../appRedux/store";
import { Provider } from "react-redux";
// import store from "../appRedux/slices/store";



const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
