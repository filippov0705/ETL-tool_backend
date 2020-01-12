import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";

import {
  procedureInfoUrl,
  procedureScheduleUrl,
  editProcedureUrl
} from "../../utils/BuildPaths";

import mainTheme from "../../style/theme";

const styles = theme => ({
  tabsWrapper: {
    height: "60px",
    alignItems: "flex-end",
    ...mainTheme.mainBackground
  },
  tab: {
    ...mainTheme.tabUnactive,
    ...mainTheme.tabStyle,
    color: "white"
  },
  activeTab: {
    ...mainTheme.tabActive,
    ...mainTheme.tabStyle,
    color: "black",
    cursor: "auto"
  },
  link: {
    marginLeft: "3px",
    textDecoration: "none",
    [theme.breakpoints.up("xs")]: {
      width: "50px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "18%"
    }
  },
  span: {
    [theme.breakpoints.up("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "box"
    }
  },
  icon: {
    [theme.breakpoints.up("xs")]: {
      display: "box"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

const Tabs = props => {
  const { classes } = props;

  return (
    <Grid container className={classes.tabsWrapper}>
      <Link to={editProcedureUrl(props.id)} className={classes.link}>
        <Grid
          item
          xs={12}
          className={props.data === "edit" ? classes.activeTab : classes.tab}
        >
          <span className={classes.span}>Details</span>
          <EditRoundedIcon className={classes.icon} />
        </Grid>
      </Link>
      <Link to={procedureInfoUrl(props.id)} className={classes.link}>
        <Grid
          item
          xs={12}
          className={props.data === "info" ? classes.activeTab : classes.tab}
        >
          <span className={classes.span}>Tasks</span>
          <MoreHorizRoundedIcon className={classes.icon} />
        </Grid>
      </Link>
      <Link to={procedureScheduleUrl(props.id)} className={classes.link}>
        <Grid
          item
          xs={12}
          className={
            props.data === "schedule" ? classes.activeTab : classes.tab
          }
        >
          <span className={classes.span}>Schedules</span>
          <ScheduleRoundedIcon className={classes.icon} />
        </Grid>
      </Link>
    </Grid>
  );
};

export default withStyles(styles)(Tabs);
