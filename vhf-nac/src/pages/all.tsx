import { useState } from "react";
import "../App.css";
import DataDisplay from "../components/DataDisplay";
import YearSelector from "../components/YearSelector";
import { ResultsStructure } from "../core/resultsDefinition";
import { useFetch } from "../hooks/useFetch";
import { useAppContext } from "../providers/AppContextProvider";

function All() {
  const [year, setYear] = useState<number>(2024);

  const yearSelected = (year: number) => {
    setYear(year);
  };

  const { store } = useAppContext();

  const { data, loading, error } = useFetch<ResultsStructure>(async () => {
    if (!store) throw new Error("Results data is unavailable");
    return await store.getTotals();
  }, [store]);

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
