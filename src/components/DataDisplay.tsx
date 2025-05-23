import { YearResult } from "../core/resultsDefinition";
import BandResults from "./BandResults";

function DataDisplay({ yearResult }: Readonly<{ yearResult?: YearResult }>) {
  return (
    <div>
      {yearResult && (
        <div key={yearResult.Year}>
          {yearResult.results.map((band) => (
            <BandResults data={band} key={band.Band} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DataDisplay;
