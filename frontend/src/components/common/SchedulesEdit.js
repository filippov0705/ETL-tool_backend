import React from "react";
import { FormattedMessage } from "react-intl";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import ArrowTooltip from "./Tooltip";
import Button from "./Button";
import DaysOfTheWeekBtns from "./DaysOfTheWeekButtons";
import DatePicker from "./DatePicker";
import Heading from "./Heading";
import RadioBtn from "./Radio";
import TimePicker from "./TimePicker";

import { procedureScheduleUrl } from "../../utils/BuildPaths";
import { MIDDLE, BACK, HIDDEN } from "../../constants/constants";

const styles = () => ({
  gridDisplay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  radio: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px"
  },
  calendar: {
    margin: "0 auto",
    position: "relative"
  },
  scheduleBtns: {
    display: "flex",
    justifyContent: "center"
  }
});

const SchedulesEdit = props => {
  const { classes } = props;
  const timepickerRef = React.createRef();

  return (
    <Grid className={classes.gridDisplay}>
      <Heading
        size={MIDDLE}
        heading={
          props.isEdit ? (
            <FormattedMessage id="schedule.editSchedule" />
          ) : (
            <FormattedMessage id="schedule.addNewSchedule" />
          )
        }
      />
      <Grid container className={classes.radio}>
        <RadioBtn
          radio={props.radio}
          isEdit={props.isEdit}
          radioBtnClick={props.radioBtnClick}
        />
      </Grid>
      <Grid container className={classes.scheduleBtns}>
        <DaysOfTheWeekBtns
          periodicity={props.radio}
          id={props.id}
          dateChange={props.dateChange}
          date={props.date}
        />
      </Grid>
      <div className={classes.calendar}>
        <DatePicker
          forwardRef={timepickerRef}
          radio={props.radio}
          date={props.date}
          dateChange={props.dateChange}
        />
        <TimePicker
          radio={props.radio}
          time={props.time}
          id={props.id}
          timeChange={props.timeChange}
          forwardRef={timepickerRef}
        />
        <Button
          linkTo={procedureScheduleUrl(props.id)}
          btnAction={props.editSchedule}
          looks={props.isEdit ? BACK : HIDDEN}
        >
          <ArrowTooltip
            isActive={props.isEdit}
            message={<FormattedMessage id="schedule.clickToEndEditing" />}
          >
            <KeyboardBackspaceIcon />
            <FormattedMessage id="schedule.back" />
          </ArrowTooltip>
        </Button>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(SchedulesEdit);
