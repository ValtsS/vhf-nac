import { QsoRecord } from "../core/resultsDefinition";

export function sortQsoRecords(data: QsoRecord[], key: number): QsoRecord[] {
  if (key === 0) {
    // Return a shallow copy in original order
    return [...data];
  }

  const keyMap: Record<number, keyof QsoRecord> = {
    1: "Corresp",
    2: "Mode",
    3: "Sent",
    4: "Recvd",
    5: "nWWLoc",
    6: "Pnt",
    7: "Remark",
  };

  const sortKey = keyMap[key];

  if (!sortKey) {
    // Invalid key, return original order
    return [...data];
  }

  return [...data].sort((a, b) => {
    const valA = a[sortKey] || "";
    const valB = b[sortKey] || "";
    return valA.localeCompare(valB);
  });
}
