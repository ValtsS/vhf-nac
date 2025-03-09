import { Link } from "react-router-dom";
import { QsoRecord } from "../core/resultsDefinition";
import { QSOTableHeaderNames } from "./QSOTableHeaderNames";
import { NavMonthLink } from "./NavMonthLink";

interface QSOLogProps {
  log?: QsoRecord[] | null;
  year: string;
  month: string;
  band: string;
  callSign: string;
}

export const QSOLog = (props: QSOLogProps) => {
  const log = props.log;

  const numericYear = +props.year;
  const numericMonth = +props.month;

  const formattedMonth =
    numericMonth < 10 ? `0${numericMonth}` : `${numericMonth}`;

  const WWLs = log ? new Set(log.map((x) => x.nWWLoc4)).size : 0;

  return (
    <>
      <h4>Band: {props.band} MHz</h4>
      <h4>Callsign: {props.callSign}</h4>

      <h4>
        <span className="nav-link">
          <NavMonthLink
            year={numericYear}
            month={numericMonth}
            band={props.band}
            callSign={props.callSign}
            minYear={numericYear}
            maxYear={numericYear}
            direction="prev"
          />
        </span>
        {`${props.year}.${formattedMonth}`}
        <span className="nav-link">
          <NavMonthLink
            year={numericYear}
            month={numericMonth}
            band={props.band}
            callSign={props.callSign}
            minYear={numericYear}
            maxYear={numericYear}
            direction="next"
          />
        </span>
      </h4>

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
                  <th key={i + text}>{text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {log.map((o: QsoRecord) => (
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
