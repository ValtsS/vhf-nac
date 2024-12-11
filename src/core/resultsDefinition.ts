export interface MonthlyScore {
  Score: number;
  Link?: string;
}

export interface ScoreData {
  OperatorName: string;
  Scores: MonthlyScore[]; // Array of scores
}

export interface BandResult {
  Band: string; // Example: "1296 MHz"
  LatvianData: ScoreData[]; // Array of operator score data
  IntData: ScoreData[]; // Array of operator score data
}

export interface YearResult {
  Year: number; // Example: 2024
  BestMonthsCount: number; // Example: 9
  results: BandResult[]; // Array of band results
}

export interface ResultsStructure {
  Years: YearResult[]; // Array of year results
}

/* Details */

export interface QsoRecord {
  Callsign: string;
  WWLoc: string;
  UTC: string;
  Corresp: string;
  Sent: string;
  Recvd: string;
  nWWLoc: string;
  Mode: string;
  Band: string;
  QRB: string;
  Pnt: string;
  nWWLoc4: string;
  Remark: string;
  DateTimeUTC: string;
}

export type QSODictionary = Record<string, QsoRecord[]>;

// Represents the overall structure
export interface QSOData {
  Year: number;
  QSOs: QSODictionary;
}
