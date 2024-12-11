import { useMemo } from "react";
import { AppContext } from "./AppContest";
import { AppContextProviderProps, AppContextValue } from "./AppContextTypes";

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
