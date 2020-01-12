import React from "react";

import { Grid } from "@material-ui/core";

import Heading from "./Heading";
import List from "./List";

const ProcedureList = props => {
  return (
    <Grid item xs={props.isFullPageWidth ? 12 : 6}>
      <Heading
        size={props.headingStyle}
        heading={props.isHeading}
        background={props.background}
      />
      <List
        data={props.data}
        className={props.className}
        action={props.action}
        needItemButtons={props.needItemButtons}
        needItemScheduleButtons={props.needItemScheduleButtons}
        needBtns={props.needBtns}
        id={props.id}
        removeBtnAction={props.removeBtnAction}
        editBtnAction={props.editBtnAction}
      >
        {props.children}
      </List>
    </Grid>
  );
};

export default ProcedureList;
