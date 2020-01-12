import React from "react";
import "date-fns";

import AvTimerIcon from "@material-ui/icons/AvTimer";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";

import {
  TIME_PICKER,
  DEFAULT_TIME,
  PERIODICALLY
} from "../../constants/constants";

const styles = () => ({
  datePicker: {
    width: 0,
    marginRight: 60,
    "& .MuiInput-underline:before": {
      borderBottom: "none",
      content: "none"
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none"
    }
  },
  hidden: {
    display: "none"
  }
});

const TimePicker = props => {
  const { classes, forwardRef, radio } = props;

  const handleDateChange = date => {
    props.timeChange([date.getHours(), date.getMinutes()]);
  };

  const getCurrentTime = () => {
    if (props.time.length) {
      return `Wed Jan 08 2020 ${props.time[0]}:${props.time[1]}:00 GMT+0300 (Moscow Standard Time)`;
    }
    return DEFAULT_TIME;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        className={radio === PERIODICALLY ? classes.datePicker : classes.hidden}
        id={TIME_PICKER}
      >
        <div ref={forwardRef}>
          <KeyboardTimePicker
            margin="normal"
            ampm={false}
            value={getCurrentTime()}
            onChange={handleDateChange}
            keyboardIcon={<AvTimerIcon />}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </div>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(TimePicker);
