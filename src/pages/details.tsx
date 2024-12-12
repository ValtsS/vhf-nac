import { useParams } from "react-router-dom";
import { QsoRecord } from "../core/resultsDefinition";
import { useFetch } from "../hooks/useFetch";
import { QSOLog } from "../components/QSOLog";
import { useAppContext } from "../providers/AppUseContext";
import { useCallback } from "react";

export const DetailsPage = () => {
  // Get the dynamic parameter from the URL
  const { id } = useParams<{ id: string }>();

  const { store } = useAppContext();
  const query = id ? decodeURIComponent(id) : "Unknown";
  const [band, year, month, callSign] = query.split(".");

  const fetchDetails = useCallback(async () => {
    if (!store) throw new Error("Results data is unavailable");
    return await store.GetDetails(
      parseInt(year),
      parseInt(month),
      parseInt(band),
      callSign,
    );
  }, [store, year, month, band, callSign]);

  const { data, loading, error } = useFetch<QsoRecord[]>(fetchDetails, [
    fetchDetails,
    store,
    year,
    month,
    band,
    callSign,
  ]);

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
      />
    </div>
  );
};

export default DetailsPage;
