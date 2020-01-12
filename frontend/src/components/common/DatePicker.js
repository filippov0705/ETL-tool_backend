import React from "react";
import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import withStyles from "@material-ui/core/styles/withStyles";

import { SINGLE, DATE_FORMAT } from "../../constants/constants";

const styles = () => ({
  datePicker: {
    width: 0,
    marginRight: 60,
    marginTop: 50
  },
  display: {
    display: "none"
  }
});

const DatePicker = props => {
  const { classes, forwardRef } = props;

  const handleDateChange = date => {
    props.dateChange([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
    if (forwardRef.current)
      forwardRef.current.getElementsByTagName("button")[0].click();
  };

  const getCurrentDate = () => {
    if (props.date.length) {
      return `${props.date[0]}/${props.date[1]}/${props.date[2]}`;
    }
    return `${new Date().getFullYear()}/${new Date().getMonth() +
      1}/${new Date().getDate()}`;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        justify="space-around"
        className={
          props.radio === SINGLE
            ? classes.datePicker
            : `${classes.datePicker} ${classes.display}`
        }
      >
        <KeyboardDatePicker
          onAccept={props.callTimePicker}
          margin="normal"
          id="date-picker-dialog"
          format={DATE_FORMAT}
          value={getCurrentDate()}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(DatePicker);
