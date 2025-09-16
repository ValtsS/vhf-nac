import { Link } from "react-router-dom";
import { ScoreData } from "../core/resultsDefinition";
import { TableHeaderNames } from "./TableHeaderNames";
import { sortResults } from "./sortResults";

interface ShowScoreProps {
  results: ScoreData[];
  showHeaders?: boolean;
  onSortChange?: (key: number) => void;
  sortOrder?: number;
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
  const clicked = (key: number) => {
    if (key >= 0 && key <= 14) {
      if (props.onSortChange) props.onSortChange(key);
    }
  };

  const data = sortResults(props.results, props.sortOrder);

  var counter = 0;

  return (
    <table>
      {props.showHeaders && (
        <thead>
          <tr>
            <th>#</th>
            {TableHeaderNames.map((text, i) => (
              <th
                key={i + text}
                onClick={() => clicked(i)}
                className={
                  props.sortOrder === i ? "active-sort" : "inactive-sort"
                }
              >
                {props.sortOrder === i ? <em>{text}</em> : text}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((o: ScoreData) => (
          <tr key={o.OperatorName}>
            <td>{++counter}</td>
            <td>{o.OperatorName}</td>
            {o.Scores.map((n, i) => (
              <td key={`${o.OperatorName}-${n.Score}-${i}`}>
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
