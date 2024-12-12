import { useCallback, useState } from "react";
import "../App.css";
import DataDisplay from "../components/DataDisplay";
import YearSelector from "../components/YearSelector";
import { ResultsStructure } from "../core/resultsDefinition";
import { useFetch } from "../hooks/useFetch";
import { useAppContext } from "../providers/AppUseContext";

function All() {
  const { store } = useAppContext();

  const [year, setYear] = useState<number | undefined>(undefined);

  const fetchTotals = useCallback(async () => {
    if (!store) throw new Error("Results data is unavailable");
    const totals = await store.getTotals();
    return totals;
  }, [store]);

  const { data, loading, error } = useFetch<ResultsStructure>(fetchTotals, [
    fetchTotals,
    store,
  ]);

  // Set the initial year inline after fetching
  const effectiveYear = year ?? store?.NewestYear;

  const yearSelected = (year: number) => {
    setYear(year);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>NAC</h1>
      {data && <YearSelector data={data} onChanged={yearSelected} />}
      {data && (
        <DataDisplay
          yearResult={(data as ResultsStructure)?.Years.find(
            (y) => y.Year == effectiveYear,
          )}
        />
      )}
    </div>
  );
}

export default All;
