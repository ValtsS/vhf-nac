import { useCallback } from "react";
import "../App.css";
import DataDisplay from "../components/DataDisplay";
import YearSelector from "../components/YearSelector";
import { ResultsStructure } from "../core/resultsDefinition";
import { useFetch } from "../hooks/useFetch";
import { useAppContext } from "../providers/AppUseContext";
import { Link } from "react-router-dom";

function All() {
  const { store, currentYear, updateCurrentYear } = useAppContext();

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
  const effectiveYear = currentYear ?? store?.NewestYear;

  const yearSelected = (year: number) => {
    if (updateCurrentYear) updateCurrentYear(year);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        <h1>NAC</h1>
        {data && (
          <YearSelector
            data={data}
            onChanged={yearSelected}
            currentYear={currentYear}
          />
        )}
        {data && (
          <DataDisplay
            yearResult={(data as ResultsStructure)?.Years.find(
              (y) => y.Year == effectiveYear,
            )}
          />
        )}
      </div>
      <div>
        <Link to={`/about`}>About</Link>
      </div>
    </>
  );
}

export default All;
