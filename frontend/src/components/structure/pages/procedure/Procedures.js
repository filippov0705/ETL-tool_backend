import React, { Component } from "react";
import { connect } from "react-redux";

import { newProcedurePath } from "../../../../utils/BuildPaths";

import AddIcon from "@material-ui/icons/Add";

import Page from "../../../common/Page";
import ProcedureList from "../../../common/ProcedureList";
import Button from "../../../common/Button";
import Search from "../../../common/Search";

import { getProceduresHeads } from "../../../../action/ProceduresActions";

class Procedures extends Component {
  componentDidMount() {
    this.props.getProceduresHeads(this.props.userId);
  }

  render() {
    return (
      <Page>
        <ProcedureList
          isFullPageWidth={true}
          isHeading={false}
          data={this.props.list}
          className="listStyle"
          needItemButtons={true}
          needBtns={true}
        >
          <Button looks={"addBtn"} linkTo={newProcedurePath()}>
            <AddIcon />
          </Button>
          <Search />
        </ProcedureList>
      </Page>
    );
  }
}

const mapStateToProps = store => {
  return {
    list: store.procedures.list,
    userId: store.procedures.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProceduresHeads: userId => dispatch(getProceduresHeads(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Procedures);
