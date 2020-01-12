import React from "react";
import { FormattedMessage } from "react-intl";

import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles(theme => ({
  formControl: {
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  manual: {
    marginBottom: 106
  },
  single: {
    marginBottom: 50
  }
}));

const RadioBtn = props => {
  const classes = useStyles();

  const handleChange = event => {
    props.radioBtnClick(event.target.value);
  };

  return (
    <FormControl component="fieldset" className={classes[props.radio]}>
      <FormLabel component="legend">
        <FormattedMessage id="radio.periodicity" />
      </FormLabel>
      <RadioGroup
        className={classes.formControl}
        aria-label="gender"
        name="gender1"
        value={props.radio}
        onChange={handleChange}
      >
        <FormControlLabel
          value="manual"
          control={<Radio />}
          label="Manual"
          disabled={props.isEdit}
        />
        <FormControlLabel
          value="Single"
          control={<Radio />}
          label="Single time"
          disabled={props.isEdit}
        />
        <FormControlLabel
          value="Periodically"
          control={<Radio />}
          label="Periodically"
          disabled={props.isEdit}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioBtn;
