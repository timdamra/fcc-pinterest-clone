import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NavMenu from './Nav';
import Signup from './Signup';
import Login from './Login';
import HomeContainer from './HomeContainer';
import MyPinsContainer from './MyPinsContainer';
import EditPin from './EditPin';
import NotFound from './NotFound';

const App = props => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <NavMenu />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/signup"
                component={Signup}
                history={props.history}
              />
              <Route
                exact
                path="/login"
                component={Login}
                history={props.history}
              />
              <Route
                exact
                path="/mypins"
                render={({ history }) => {
                  if (!props.auth) {
                    return <h3>Must be logged in</h3>;
                  }
                  return <MyPinsContainer history={history} />;
                }}
              />
              <Route
                exact
                path="/editpin"
                render={({ history }) => {
                  if (!props.auth) {
                    return <h3>Must be logged in</h3>;
                  }
                  return <EditPin history={history} />;
                }}
              />
              <Route exact path="/" component={HomeContainer} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth
  };
}

export default connect(mapStateToProps)(App);
