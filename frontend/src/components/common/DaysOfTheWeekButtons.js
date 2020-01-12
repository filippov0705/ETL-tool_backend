import React from "react";

import Button from "./Button";

import { procedureScheduleUrl } from "../../utils/BuildPaths";

import { DAYS_OF_THE_WEEK, PERIODICALLY } from "../../constants/constants";

const DaysOfTheWeekBtns = props => {
  const createButtons = () => {
    return DAYS_OF_THE_WEEK.map((item, i) => {
      return (
        <Button
          key={i}
          btnAction={() => props.dateChange(item)}
          linkTo={procedureScheduleUrl(props.id)}
          looks={props.date.includes(item) ? "sceduleBtnActive" : "sceduleBtn"}
        >
          {item}
        </Button>
      );
    });
  };

  return (
    <React.Fragment>
      {props.periodicity === PERIODICALLY ? createButtons() : null}
    </React.Fragment>
  );
};

export default DaysOfTheWeekBtns;
