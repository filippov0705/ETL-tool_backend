import React, { Component } from "react";
import Tasks from "../task/Tasks";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
  setChosenTasks,
  editList,
  getUserData,
  setTargetProcedure,
  changeTaskList
} from "../../../../action/ProceduresActions";
import ProcedurePage from "./ProcedurePage";
import Tabs from "../../../common/Tabs";
import Heading from "../../../common/Heading";
import Input from "../../../common/Input";

const styles = theme => ({
  gridDisplay: {
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  input: {
    margin: "30px 0",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  }
});

class EditProcedure extends Component {
  componentDidMount() {
    this.props.setChosenTasks(this.props.match.params.id);
  }

  applyTask = event => {
    const task = {
      name: event.target.innerText,
      id: (Math.random() * 10000000 + "").split(".")[0]
    };
    const newTaskList = this.props.procedures.chosenTasks.concat(task);
    const newProcedureList = this.props.procedures.proceduresList.map(item => {
      if (item.id === this.props.match.params.id) {
        item.tasks = newTaskList;
      }
      return item;
    });

    this.props.editList(newProcedureList);
    this.props.changeTaskList(newTaskList);
  };

  removeTask = event => {
    const filteredTasks = this.props.procedures.chosenTasks.filter(
      item => item.id !== event.target.dataset.id
    );
    const newPeocedureList = this.props.procedures.proceduresList.map(item => {
      if (item.id === this.props.match.params.id) {
        item.tasks = filteredTasks;
      }
      return item;
    });
    const newChosenTasks = this.props.procedures.chosenTasks.filter(item => {
      return item.id !== event.target.dataset.id;
    });

    this.props.editList(newPeocedureList);
    this.props.changeTaskList(newChosenTasks);
  };

  changeProcedureName = value => {
    const newPeocedureList = this.props.procedures.proceduresList.map(item => {
      if (item.id === this.props.match.params.id) {
        item.name = value;
      }
      return item;
    });
    this.props.editList(newPeocedureList);
  };

  render() {
    if (this.props.procedures.targetProcedure.length === 0) return null;
    const { classes } = this.props;

    return (
      <ProcedurePage>
        <Heading
          heading={this.props.procedures.targetProcedure[0].name}
          size={"big"}
          background={"pageLabel"}
        />
        <Tabs data={"edit"} id={this.props.match.params.id} />
        <Grid container className={classes.input}>
          <Input
            label={"Change procedure name: "}
            data={
              this.props.procedures.proceduresList.find(
                item => item.id === this.props.match.params.id
              ).name
            }
            action={this.changeProcedureName}
          />
        </Grid>
        <Grid className={classes.gridDisplay}>
          <Tasks
            heading={"Types of available tasks"}
            data={"possibleTasks"}
            content={"possibleTasks"}
            action={this.applyTask}
          />
          <Tasks
            heading={"Chosen tasks"}
            data={"chosenTasks"}
            content={"chosenTasks"}
            action={this.removeTask}
          />
        </Grid>
      </ProcedurePage>
    );
  }
}

const mapStateToProps = store => {
  return {
    procedures: store.procedures
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(getUserData()),
    setTargetProcedure: id => dispatch(setTargetProcedure(id)),
    setChosenTasks: id => dispatch(setChosenTasks(id)),
    changeTaskList: taskList => dispatch(changeTaskList(taskList)),
    editList: list => dispatch(editList(list))
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(EditProcedure)
);
