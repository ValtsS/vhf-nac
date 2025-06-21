import { useState } from "react";
import { BandResult } from "../core/resultsDefinition";
import ShowScores from "./ShowScores";

function BandResults({ data }: Readonly<{ data: BandResult }>) {
  const [sortOrder, setSortOrder] = useState<number>(13);

  const onSort = (key: number) => {
    setSortOrder(key);
  };

  return (
    <div>
      <section id={data.Band}>
        <h4>{data.Band}</h4>
        <ShowScores
          results={data.LatvianData}
          showHeaders={true}
          sortOrder={sortOrder}
          onSortChange={onSort}
        />
        <ShowScores
          results={data.IntData}
          showHeaders={true}
          sortOrder={sortOrder}
          onSortChange={onSort}
        />
      </section>
    </div>
  );
}

export default BandResults;
