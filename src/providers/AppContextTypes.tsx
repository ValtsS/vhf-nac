import { DataStore } from "../core/dataStore";

export type AppContextProviderProps = {
  children: React.ReactNode;
  store: DataStore | null;
};

export type AppContextValue = {
  store: DataStore | null;
  currentYear?: number;
  updateCurrentYear?: (year: number) => void;
};
