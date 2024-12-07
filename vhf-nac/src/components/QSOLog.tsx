import { QsoRecord } from "../core/resultsDefinition";
import { QSOTableHeaderNames } from "./QSOTableHeaderNames";

export const QSOLog = (log: QsoRecord[]) => {
  return (
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
            <td>{o.Corresp}</td>
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
  );
};
