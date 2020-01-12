import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Procedures from "./Procedures";
import NewProcedure from "./NewProcedure";
import EditProcedure from "./EditProcedure";
import InfoProcedure from "./InfoProcedure";
import ScheduleProcedure from "./ScheduleProcedure";
import {
  ProceduresPath,
  procedureInfoPath,
  procedureSchedulePath,
  newProcedurePath,
  editProcedurePath
} from "../../../../utils/BuildPaths";

const ProceduresRouter = props => (
  <Switch>
    <Route
      exact
      path={ProceduresPath()}
      name={"Procedures"}
      component={Procedures}
    />
    <Route
      path={newProcedurePath()}
      name={"NewProcedure"}
      component={NewProcedure}
    />
    <Route
      path={editProcedurePath()}
      name={"EditProcedure"}
      component={EditProcedure}
    />
    <Route
      path={procedureInfoPath()}
      name={"InfoProcedure"}
      component={InfoProcedure}
    />
    <Route
      path={procedureSchedulePath()}
      name={"ScheduleProcedure"}
      component={ScheduleProcedure}
    />
  </Switch>
);

export default withRouter(ProceduresRouter);
