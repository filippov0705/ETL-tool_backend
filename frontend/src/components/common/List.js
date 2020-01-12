import React from "react";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Item from "./Item";
import ItemButtons from "./ItemButtons";
import ItemScheduleButtons from "./ItemScheduleButtons";

import mainTheme from "../../style/theme";

const styles = () => ({
  list: {
    height: "665px",
    backgroundColor: "white",
    margin: "20px",
    border: "1px solid gray",
    borderRadius: "7px",
    overflow: "auto"
  },
  smallList: {
    ...mainTheme.tasks
  },
  data: {
    minHeight: "620px",
    backgroundColor: "white",
    margin: "20px",
    border: "1px solid gray",
    borderRadius: "7px",
    overflow: "auto"
  },
  listStyle: {
    ...mainTheme.listStyle
  },
  listMainStyle: {
    ...mainTheme.listMainStyle
  }
});

const List = props => {
  const { classes } = props;

  const itemCreation = data => {
    return data.map((item, i) => {
      return (
        <Item
          name={item.name}
          id={item.id}
          key={i}
          action={props.action}
          needBtns={props.needBtns}
        >
          {props.needItemButtons ? <ItemButtons id={item.id} /> : null}
          {props.needItemScheduleButtons ? (
            <ItemScheduleButtons
              removeBtnAction={props.removeBtnAction}
              editBtnAction={props.editBtnAction}
              id={item.id}
              scheduleId={props.id}
            />
          ) : null}
        </Item>
      );
    });
  };

  return (
    <Grid
      item
      className={`${classes[props.className]} ${classes.listMainStyle}`}
    >
      {props.children}
      {itemCreation(props.data)}
    </Grid>
  );
};

export default withStyles(styles)(List);
