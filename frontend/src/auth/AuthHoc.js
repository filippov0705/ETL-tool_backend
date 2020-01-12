import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import Root from "../components/root/Root";
import { CookiesProvider } from "react-cookie";
import { mainPath } from "../utils/BuildPaths";

class AuthHoc extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path={mainPath()}
            render={() => {
              return (
                <CookiesProvider>
                  <Root />
                </CookiesProvider>
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default AuthHoc;
