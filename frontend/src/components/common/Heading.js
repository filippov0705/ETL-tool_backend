import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import mainTheme from "../../style/theme";

const styles = theme => ({
  big: {
    margin: "0 auto",
    marginTop: "10px",
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.5em"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2em"
    }
  },
  middle: {
    margin: "0 auto",
    marginTop: "10px",
    [theme.breakpoints.up("xs")]: {
      fontSize: "0.8em"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.3em"
    }
  },
  pageLabel: {
    ...mainTheme.mainBackground
  },
  emphasized: {
    borderBottom: "1px solid rgba(94, 92, 92, 0.225)",
    height: 50
  },
  middle_left: {
    marginTop: "10px",
    marginLeft: 30,
    [theme.breakpoints.up("xs")]: {
      fontSize: "0.8em"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.3em"
    }
  }
});

const Heading = props => {
  const { classes } = props;

  return (
    <Grid container className={classes[props.background]}>
      <h3 className={classes[props.size]}>{props.heading}</h3>
    </Grid>
  );
};

export default withStyles(styles)(Heading);
