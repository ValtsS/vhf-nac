import { BandResult } from "../core/resultsDefinition";
import ShowScores from "./ShowScores";

function BandResults({ data }: Readonly<{ data: BandResult }>) {
  return (
    <div>
      <h4>{data.Band}</h4>
      <ShowScores results={data.LatvianData} showHeaders={true} />
      <ShowScores results={data.IntData} showHeaders={true} />
    </div>
  );
}

export default BandResults;
