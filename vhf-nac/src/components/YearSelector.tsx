import { ResultsStructure } from "../core/resultsDefinition";

interface YearSelectorProps {
  data: ResultsStructure;
  onChanged?: (year: number) => void;
}

export const YearSelector = (props: YearSelectorProps) => {
  const onAddrChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (props.onChanged) props.onChanged(+event.target.value);
  };

  return (
    <div>
      <select name="yearSelector" onChange={onAddrChange}>
      {props.data.Years
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a, b) => b.Year - a.Year) // Sort in descending order
          .map((val) => (
            <option value={val.Year} key={"Sel" + val.Year}>
              {val.Year}
            </option>
          ))}
      </select>
    </div>
  );
};

export default YearSelector;
