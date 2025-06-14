import { Link } from "react-router-dom";
import { QsoRecord } from "../core/resultsDefinition";
import { QSOTableHeaderNames } from "./QSOTableHeaderNames";
import { QSOLogheader } from "./QSOLogheader";
import { useState } from "react";
import { sortQsoRecords } from "./sortQsoRecords";

interface QSOLogProps {
  log?: QsoRecord[] | null;
  year: string;
  month: string;
  band: string;
  callSign: string;
}

export const QSOLog = (props: QSOLogProps) => {
  const [sortOrder, setSortOrder] = useState<number>(0);

  const sortedLog = sortQsoRecords(props.log ?? [], sortOrder);

  const log = props.log;
  const WWLs = log
    ? new Set(
        log
          .filter((val: QsoRecord) => val.nWWLoc4 && val.nWWLoc4.length > 0)
          .map((x) => x.nWWLoc4),
      ).size
    : 0;

  return (
    <>
      <QSOLogheader
        band={props.band}
        callSign={props.callSign}
        year={props.year}
        month={props.month}
      />
      {(!log || log.length == 0) && <>No log entries found</>}

      {log && log.length > 0 && (
        <>
          <p>QTH: {log[0].WWLoc}</p>
          <p>Reported QSOs: {log.length}</p>
          <p>Reported WWLs: {WWLs}</p>
          <p>
            Not accepted QSOs:{" "}
            {log.filter((val: QsoRecord) => val.Pnt == "0").length}
          </p>
          <table>
            <thead>
              <tr>
                {QSOTableHeaderNames.map((text, i) => (
                  <th
                    key={i + text}
                    onClick={() => setSortOrder(i)}
                    className={
                      sortOrder === i ? "active-sort" : "inactive-sort"
                    }
                  >
                    {text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedLog.map((o: QsoRecord) => (
                <tr key={`${o.UTC}.${o.Corresp}`}>
                  <td>{o.UTC}</td>
                  <td>
                    <Link
                      to={`/details/${encodeURIComponent(`${o.Band}.${props.year}.${props.month}.${o.Corresp}`)}`}
                    >
                      {o.Corresp}
                    </Link>
                  </td>
                  <td>{o.Mode}</td>
                  <td>{o.Sent}</td>
                  <td>{o.Recvd}</td>
                  <td>{o.nWWLoc}</td>
                  <td>{o.Pnt}</td>
                  <td>{o.Remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
