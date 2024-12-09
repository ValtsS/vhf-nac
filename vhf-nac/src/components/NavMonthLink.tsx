import { Link } from "react-router-dom";

interface NavMonthLink {
    year: number;
    month: number;
    band: string;
    callSign: string;
    minYear: number;
    maxYear: number;
    direction: "prev" | "next";
  }

  export const NavMonthLink = ({
    year,
    month,
    band,
    callSign,
    minYear,
    maxYear,
    direction,
  }: NavMonthLink) => {
    let newYear = year;
    let newMonth = month;

    if (direction === "prev") {
      newMonth = month > 1 ? month - 1 : 12;
      newYear = month > 1 ? year : year - 1;
    } else {
      newMonth = month < 12 ? month + 1 : 1;
      newYear = month < 12 ? year : year + 1;
    }

    // Check bounds
    if (newYear < minYear || newYear > maxYear) return <></>;

    const link = `${band}.${newYear}.${newMonth}.${callSign}`;
    const label = direction === "prev" ? "← " : " →";

    return (
      <Link to={`/details/${encodeURIComponent(link)}`}>{label}</Link>
    );
  };