import { ScoreData } from "../core/resultsDefinition";

export function sortResults(results: ScoreData[], sortOrder?: number) {
  return results.sort((a, b) => {
    let keyA, keyB;

    if (sortOrder === undefined || sortOrder === null) {
      keyA = b.Scores[12].Score;
      keyB = a.Scores[12].Score;
    } else if (sortOrder === 0) {
      keyA = a.OperatorName.toLowerCase();
      keyB = b.OperatorName.toLowerCase();
    } else {
      keyA = b.Scores[sortOrder - 1].Score;
      keyB = a.Scores[sortOrder - 1].Score;
    }

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
}
