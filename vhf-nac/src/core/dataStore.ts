import { getDetails, getSummary } from "./client";
import {
  QSODictionary,
  QsoRecord,
  ResultsStructure,
} from "./resultsDefinition";

export class DataStore {
  private Totals: ResultsStructure | null = null;
  public NewestYear?: number;

  async getTotals(): Promise<ResultsStructure> {
    if (this.Totals) return this.Totals;

    try {
      this.Totals = await getSummary("results.lz4");
      this.NewestYear = this.Totals.Years.reduce(
        (max, x) => (x.Year > max ? x.Year : max),
        -Infinity,
      );
      return this.Totals;
    } catch (err) {
      // Handle any unexpected errors
      const error = err as Error;
      console.error("Error in getTotals:", error.message);
      throw new Error("Unable to fetch totals. Please try again later.");
    }
  }

  private Details: Record<number, QSODictionary> = {};

  async GetDetails(
    Year: number,
    Month: number,
    Band: number,
    callsign: string,
  ): Promise<QsoRecord[]> {
    const loaded = this.Details[Year] !== undefined;

    //50.2024.1.YL2AO
    const key = `${Band}.${Year}.${Month}.${callsign}`;

    if (loaded) return this.Details[Year][key] ?? [];

    try {
      this.Details[Year] = (await getDetails(`${Year}.lz4`)).QSOs;
      return this.Details[Year][key] ?? [];
    } catch (err) {
      // Handle any unexpected errors
      const error = err as Error;
      console.error("Error in getDetails:", error.message);
      throw new Error("Unable to fetch details. Please try again later.");
    }
  }
}
