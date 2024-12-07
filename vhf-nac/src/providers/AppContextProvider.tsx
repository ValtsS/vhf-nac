import React, { useMemo } from "react";
import { DataStore } from "../core/dataStore";

type AppContextValue = {
  store: DataStore | null;
};

export const AppContext = React.createContext<AppContextValue>({
  store: null,
});

type AppContextProviderProps = {
  children: React.ReactNode;
  store: DataStore | null;
};

export const AppContextProvider = ({
  children,
  store,
}: AppContextProviderProps) => {
  const contextValue: AppContextValue = useMemo(() => {
    return {
      store,
    };
  }, [store]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export function useAppContext() {
  const store = React.useContext(AppContext);
  if (!store) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return store;
}
