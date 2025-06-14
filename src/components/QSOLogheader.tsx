import { NavMonthLink } from "./NavMonthLink";

interface QSOHeaderProps {
  year: string;
  month: string;
  band: string;
  callSign: string;
}

export const QSOLogheader = (props: QSOHeaderProps) => {
  const numericYear = +props.year;
  const numericMonth = +props.month;
  const formattedMonth =
    numericMonth < 10 ? `0${numericMonth}` : `${numericMonth}`;

  return (
    <>
      <h4>Band: {props.band} MHz</h4>
      <h4>Callsign: {props.callSign}</h4>

      <h4>
        <span className="nav-link">
          <NavMonthLink
            year={numericYear}
            month={numericMonth}
            band={props.band}
            callSign={props.callSign}
            minYear={numericYear}
            maxYear={numericYear}
            direction="prev"
          />
        </span>
        {`${props.year}.${formattedMonth}`}
        <span className="nav-link">
          <NavMonthLink
            year={numericYear}
            month={numericMonth}
            band={props.band}
            callSign={props.callSign}
            minYear={numericYear}
            maxYear={numericYear}
            direction="next"
          />
        </span>
      </h4>
    </>
  );
};
