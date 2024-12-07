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
  }, [store]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Band: {band} MHz</p>
      <p>Callsign: {callSign}</p>
      <p>
        {year}.{+month < 10 ? "0" + month : month}
      </p>

      <>{data && QSOLog(data)}</>
    </div>
  );
};

export default DetailsPage;
