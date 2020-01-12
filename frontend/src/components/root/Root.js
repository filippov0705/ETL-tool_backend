import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Main from "../structure/pages/Main";
import ProceduresRouter from "../structure/pages/procedure/ProceduresRouter";
import PageTemplate from "./PageTemplate";
import { ProceduresPath } from "../../utils/BuildPaths";

const Root = props => (
  <PageTemplate location={props.history.location.pathname}>
    <Switch>
      <Route
        path={ProceduresPath()}
        name={"ProceduresRouter"}
        component={ProceduresRouter}
      />
      <Route name={"Main"} component={Main} />
    </Switch>
  </PageTemplate>
);

export default withRouter(Root);
