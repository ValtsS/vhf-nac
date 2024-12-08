import { QsoRecord } from "../core/resultsDefinition";
import { QSOTableHeaderNames } from "./QSOTableHeaderNames";

interface QSOLogProps {
  log?: QsoRecord[] | null;
  year: string;
  month: string;
}

export const QSOLog = (props: QSOLogProps) => {
  const log = props.log;
  if (!log || log.length == 0) return <>No log entries found</>;

  return (
    <>
      <h4>
        {props.year}.{+props.month < 10 ? "0" + props.month : props.month}
      </h4>
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
            <tr>
              <td>{o.UTC}</td>
              <td>
                <a href={`${o.Band}.${props.year}.${props.month}.${o.Corresp}`}>{o.Corresp}</a>
              </td>
              <td>{o.Mode}</td>
              <td>{o.Sent}</td>
              <td>{o.Recvd}</td>
              <td>{o.nWWLoc}</td>
              <td>{o.Pnt}</td>
              <td>{o.QRB}</td>
              <td>{o.Remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
