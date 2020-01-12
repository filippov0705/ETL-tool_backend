import React from "react";
import { FormattedMessage } from "react-intl";

import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  input: {
    marginLeft: "10px",
    height: "30px",
    borderRadius: "5px",
    width: "220px"
  },
  label: {
    display: "flex",
    alignItems: "center",
    width: "80%",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  labelSpan: {
    marginLeft: "20px"
  }
});

const Input = props => {
  const { classes } = props;

  const inputTextChange = event => {
    props.clickAction(event.target.value);
  };

  return (
    <label className={classes.label}>
      <span className={classes.labelSpan}>{props.label}</span>
      <Tooltip title={<FormattedMessage id="procedure.signRestriction" />}>
        <input
          className={classes.input}
          onChange={inputTextChange}
          value={props.value}
          onBlur={props.blurAction}
        />
      </Tooltip>
    </label>
  );
};

export default withStyles(styles)(Input);
