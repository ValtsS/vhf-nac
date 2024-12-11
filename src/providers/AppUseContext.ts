import React from "react";
import { AppContext } from "./AppContest";

export function useAppContext() {
  const store = React.useContext(AppContext);
  if (!store) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return store;
}
