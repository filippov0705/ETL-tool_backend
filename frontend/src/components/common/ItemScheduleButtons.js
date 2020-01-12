import React from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "./Button";

import { procedureScheduleUrl } from "../../utils/BuildPaths";

const styles = () => ({
  itemName: {
    height: 32,
    display: "flex",
    alignItems: "center",
    paddingRight: "15px",
    justifyContent: "flex-end"
  }
});

const ItemScheduleButtons = props => {
  const { classes } = props;
  const itemRemoveAction = () => {
    props.removeBtnAction(props.id);
  };

  const itemEditAction = () => {
    props.editBtnAction(props.id);
  };

  return (
    <Grid item xs={12} sm={4} md={3} className={classes.itemName}>
      <Button
        linkTo={procedureScheduleUrl(props.scheduleId)}
        looks={"itemEdit"}
        btnAction={itemEditAction}
      >
        <EditIcon />
      </Button>
      <Button
        linkTo={procedureScheduleUrl(props.scheduleId)}
        looks={"itemRemove"}
        btnAction={itemRemoveAction}
      >
        <DeleteIcon />
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(ItemScheduleButtons);
