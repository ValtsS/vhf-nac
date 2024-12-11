import React from "react";
import { AppContextValue } from "./AppContextTypes";

export const AppContext = React.createContext<AppContextValue>({
  store: null,
});
