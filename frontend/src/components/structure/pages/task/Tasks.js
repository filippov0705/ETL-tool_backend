import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "../../../../action/ProceduresActions";
import List from "../../../common/List";
import { Grid } from "@material-ui/core";
import Heading from "../../../common/Heading";

class Tasks extends Component {
  render() {
    const data =
      typeof this.props.data === "string"
        ? this.props.procedures[this.props.data]
        : this.props.data;
    return (
      <Grid
        item
        xs={this.props.info !== "possibleTasks" || "chosenTasks" ? 12 : 6}
      >
        <Heading size={"middle"} heading={this.props.heading} />
        <List
          data={data || []}
          content={this.props.content}
          action={this.props.action}
          id={this.props.id}
          info={this.props.info}
        />
      </Grid>
    );
  }
}

const mapStateToProps = store => {
  return {
    procedures: store.procedures
  };
};

export default connect(mapStateToProps)(Tasks);
