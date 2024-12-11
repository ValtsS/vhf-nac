import { Link } from "react-router-dom";
import { ScoreData } from "../core/resultsDefinition";
import { TableHeaderNames } from "./TableHeaderNames";

interface ShowScoreProps {
  results: ScoreData[];
  showHeaders?: boolean;
}

interface OlinkProps {
  score: number;
  link?: string;
}

export const Olink = (props: OlinkProps) => {
  if (props.score === undefined || (props.score === 0 && !props.link)) {
    return <></>; // Return empty if score is undefined or 0 without a link
  }

  if (props.link) {
    return (
      <Link to={`/details/${encodeURIComponent(props.link)}`}>
        {props.score}
      </Link>
    );
  } else {
    return <>{props.score}</>;
  }
};

export const ShowScores = (props: ShowScoreProps) => {
  return (
    <table>
      {props.showHeaders && (
        <thead>
          <tr>
            {TableHeaderNames.map((text, i) => (
              <th key={i + text}>{text}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {props.results.map((o: ScoreData) => (
          <tr key={o.OperatorName}>
            <td>{o.OperatorName}</td>
            {o.Scores.map((n, i) => (
              <td key={i}>
                <Olink link={n.Link} score={n.Score} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowScores;
