import { useCallback, useMemo, useState } from "react";
import { AppContext } from "./AppContest";
import { AppContextProviderProps, AppContextValue } from "./AppContextTypes";

export const AppContextProvider = ({
  children,
  store,
}: AppContextProviderProps) => {
  const [currentYear, setCurrentYear] = useState<number | undefined>(undefined);

  const updateCurrentYear = useCallback((year: number) => {
    setCurrentYear(year);
  }, []);

  const contextValue: AppContextValue = useMemo(() => {
    return {
      store,
      currentYear,
      updateCurrentYear,
    };
  }, [store, currentYear, updateCurrentYear]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
