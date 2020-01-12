import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import randomInt from "random-int";

import Heading from "../../../common/Heading";
import ProcedureList from "../../../common/ProcedureList";
import ProcedurePage from "./ProcedurePage";
import SchedulesEdit from "../../../common/SchedulesEdit";
import Tabs from "../../../common/Tabs";

import { SINGLE, SCHEDULE } from "../../../../constants/constants";

import {
  addNewSchedule,
  removeSchedule,
  editSchedule,
  getProcedureSchedules
} from "../../../../action/ProceduresActions";

class ScheduleProcedure extends Component {
  constructor() {
    super();
    this.state = {
      radio: "manual",
      edit: false,
      date: [],
      time: [],
      editScheduleId: null
    };
  }

  componentDidMount() {
    this.props.getProcedureSchedules(this.props.userId, this.props.match.params.id);
  }

  dateChange = value => {
    if (this.state.radio === SINGLE) {
      return this.setState({ date: value });
    }
    if (!this.state.date.includes(value)) {
      this.setState({ date: [...this.state.date, value] });
    } else {
      this.setState({ date: this.state.date.filter(item => item !== value) });
    }
  };

  timeChange = time => {
    this.setState({ time });
    if (this.state.date.length || !this.state.edit) this.applySchedule(time);
  };

  formatNumber = value => {
    return value.map(item => {
      if (`${item}`.length === 1) return `0${item}`;
      return item;
    });
  };

  applySchedule = value => {
    if (this.state.edit || this.state.date.length === 0) return;
    this.props.addNewSchedule(this.props.userId, this.props.match.params.id, {
      id: `${randomInt(10000000, 99999999)}`,
      value: [...this.state.date, ...value],
      periodicity: this.state.radio
    });

    this.setState({ date: [], time: [] });
  };

  radioBtnClick = radio => {
    this.setState({ radio, date: [] });
  };

  editBtnAction = id => {
    if (!this.state.edit) this.setState({ edit: true });
    const targetSchedule = this.props.targetProcedure.schedule.find(item => item.id === id);

    this.setState({
      radio: targetSchedule.periodicity,
      date: [...targetSchedule.value.slice(0, targetSchedule.value.length - 2)],
      time: [...targetSchedule.value.slice(targetSchedule.value.length - 2)],
      editScheduleId: id
    });
  };

  removeBtnAction = id => {
    this.props.removeSchedule(this.props.userId, this.props.match.params.id, id);
    if (this.state.edit) this.setState({ edit: false, date: [], time: [] });
  };

  editSchedule = () => {
    if (this.state.date.length === 0)
      return this.setState({ edit: false, date: [], time: [] });

    this.props.editSchedule(this.props.userId, this.props.match.params.id, {
      id: this.state.editScheduleId,
      value: [...this.state.date, ...this.state.time],
      periodicity: this.state.radio
    });

    this.setState({ edit: false, date: [], time: [] });
  };

  createScheduleName = schedule => {
    if (schedule.periodicity === SINGLE) {
      return `Runs only on ${this.formatNumber(
        schedule.value.slice(0, schedule.value.length - 2)
      ).join(" ")} at ${this.formatNumber(
        schedule.value.slice(schedule.value.length - 2)
      ).join(":")}`;
    } else {
      return `Runs every ${this.formatNumber(
        schedule.value.slice(0, schedule.value.length - 2)
      ).join(" ")} at ${this.formatNumber(
        schedule.value.slice(schedule.value.length - 2)
      ).join(":")}`;
    }
  };

  addNamesToSchedulesInData = procedureSchedule => {
    return procedureSchedule.map(item => {
      return (item = {
        name: this.createScheduleName(item),
        value: item.value,
        periodisity: item.periodicity,
        id: item.id
      });
    });
  };

  render() {
    if (!this.props.targetProcedure) return null;

    return (
      <ProcedurePage>
        <Heading
          heading={this.props.targetProcedure.name}
          size="big"
          background="pageLabel"
        />
        <Tabs data={SCHEDULE} id={this.props.match.params.id} />
        <SchedulesEdit
          isEdit={this.state.edit}
          id={this.props.match.params.id}
          radio={this.state.radio}
          radioBtnClick={this.radioBtnClick}
          dateChange={this.dateChange}
          date={this.state.date}
          time={this.state.time}
          timeChange={this.timeChange}
          editSchedule={this.editSchedule}
        />
        <ProcedureList
          data={this.addNamesToSchedulesInData(this.props.targetProcedure.schedule)}
          isFullPageWidth={true}
          isHeading={<FormattedMessage id="schedule.Schedules" />}
          headingStyle="middle_left"
          background="emphasized"
          needItemScheduleButtons={true}
          removeBtnAction={this.removeBtnAction}
          editBtnAction={this.editBtnAction}
          needBtns={true}
          id={this.props.match.params.id}
        />
      </ProcedurePage>
    );
  }
}

const mapStateToProps = store => {
  return {
    targetProcedure: store.procedures.targetProcedure,
    userId: store.procedures.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewSchedule: (userId, procedureId, newSchedule) =>
      dispatch(addNewSchedule(userId, procedureId, newSchedule)),
    removeSchedule: (userId, procedureId, scheduleId) =>
      dispatch(removeSchedule(userId, procedureId, scheduleId)),
    editSchedule: (userId, procedureId, editableSchedule) =>
      dispatch(editSchedule(userId, procedureId, editableSchedule)),
      getProcedureSchedules: (userId, procedureId) => dispatch(getProcedureSchedules(userId, procedureId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleProcedure);