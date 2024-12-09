import { decompress } from 'lz4js';
import { QSOData, ResultsStructure } from "./resultsDefinition";

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const compressedData = new Uint8Array(await response.arrayBuffer());
      const decompressedData = decompress(compressedData);
      return JSON.parse(new TextDecoder().decode(decompressedData)) as T;
  } catch (err) {
      console.error("Decompression Error:", err); // Debug
      throw err;
  }
};

export const getSummary = async (url: string): Promise<ResultsStructure> =>
  fetchData<ResultsStructure>(url);

export const getDetails = async (url: string): Promise<QSOData> =>
  fetchData<QSOData>(url);
