import { useParams } from "react-router-dom";
import { QsoRecord } from "../core/resultsDefinition";
import { useFetch } from "../hooks/useFetch";
import { useAppContext } from "../providers/AppContextProvider";
import { QSOLog } from "../components/QSOLog";

export const DetailsPage = () => {
  // Get the dynamic parameter from the URL
  const { id } = useParams<{ id: string }>();

  const { store } = useAppContext();
  const query = id ? decodeURIComponent(id) : "Unknown";
  const [band, year, month, callSign] = query.split(".");

  const { data, loading, error } = useFetch<QsoRecord[]>(async () => {
    if (!store) throw new Error("Results data is unavailable");
    return await store.GetDetails(
      parseInt(year),
      parseInt(month),
      parseInt(band),
      callSign,
    );
  }, [store, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <QSOLog
        log={data}
        year={year}
        month={month}
        band={band}
        callSign={callSign}
        maxYear={store?.NewestYear ?? 2024}
        minYear={store?.OldestYear ?? 2024}
      />
    </div>
  );
};

export default DetailsPage;
