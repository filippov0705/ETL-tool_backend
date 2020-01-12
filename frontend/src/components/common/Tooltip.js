import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  wrapper: {
    position: "relative"
  },
  tooltip: {
    position: "absolute",
    bottom: -30,
    left: 82,
    backgroundColor: "rgba(166, 166, 166, 0.966)",
    padding: "5px 7px",
    borderRadius: 5,
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  arrowRight: {
    position: "absolute",
    top: 18,
    left: -10,
    width: 0,
    height: 0,
    borderTop: "10px solid transparent",
    borderBottom: "10px solid transparent",
    borderRight: "10px solid rgba(166, 166, 166, 0.966)"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center"
  }
});

const ArrowTooltip = props => {
  const { classes } = props;
  const tooltipRef = React.createRef();

  const hideTooltip = () => {
    if (tooltipRef.current) tooltipRef.current.remove();
  };

  return (
    <div className={classes.wrapper} onMouseEnter={hideTooltip}>
      <div className={classes.contentWrapper}>{props.children}</div>
      <div className={classes.tooltip} ref={tooltipRef}>
        <div className={classes.arrowRight}></div>
        <span>{props.message}</span>
      </div>
    </div>
  );
};

export default withStyles(styles)(ArrowTooltip);
