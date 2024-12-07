import { QSOData, ResultsStructure } from "./resultsDefinition";

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data: T = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getSummary = async (url: string): Promise<ResultsStructure> =>
  fetchData<ResultsStructure>(url);

export const getDetails = async (url: string): Promise<QSOData> =>
  fetchData<QSOData>(url);
