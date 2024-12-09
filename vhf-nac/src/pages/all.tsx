import { useState } from "react";
import "../App.css";
import DataDisplay from "../components/DataDisplay";
import YearSelector from "../components/YearSelector";
import { ResultsStructure } from "../core/resultsDefinition";
import { useFetch } from "../hooks/useFetch";
import { useAppContext } from "../providers/AppContextProvider";

function All() {
  const { store } = useAppContext();

  const [year, setYear] = useState<number | undefined>();

  const { data, loading, error } = useFetch<ResultsStructure>(async () => {
    if (!store) throw new Error("Results data is unavailable");
    const totals = await store.getTotals();
    setYear(store.NewestYear);
    return totals;
  }, [store]);

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
            (y) => y.Year == year,
          )}
        />
      )}
    </div>
  );
}

export default All;
