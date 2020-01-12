import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  grid: {
    maxHeight: "32px",
    display: "flex",
    alignItems: "center"
  },
  itemBorder: {
    border: "1px solid rgba(94, 92, 92, 0.225)",
    borderRadius: 5,
    margin: "0 auto",
    marginBottom: 5,
    marginTop: 5,
    cursor: "pointer",
    width: "99%"
  },
  gridSpan: {
    marginLeft: "10px",
    marginTop: "2px",
    marginBottom: "2px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  link: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "black"
  }
});

const Item = props => {
  const { classes } = props;

  const itemClick = () => {
    if (props.action) props.action(props.id);
  };

  return (
    <Grid container className={classes.itemBorder} onClick={itemClick}>
      <Grid
        item
        xs={12}
        sm={props.needBtns ? 8 : 12}
        md={props.needBtns ? 9 : 12}
        className={classes.grid}
      >
        <span data-id={props.id} className={classes.gridSpan}>
          {props.name.substr(0, 35)}
        </span>
      </Grid>
      {props.children}
    </Grid>
  );
};

export default withStyles(styles)(Item);
