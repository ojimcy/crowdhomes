import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "viwes-account" */ './account/Profile')
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './dashboard')
);
const Referrals = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './account/Referrals')
);
const Matrix = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './account/Matrix')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/realfi`}
            />
            <Route
              path={`${match.url}/realfi`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/army`}
              render={(props) => <Profile {...props} />}
            />
            <Route
              path={`${match.url}/army/referrals`}
              render={(props) => <Referrals {...props} />}
            />
            <Route
              path={`${match.url}/army/matrix`}
              render={(props) => <Matrix {...props} />}
            />
            <Route
              path={`${match.url}/army/how-it-works`}
              render={(props) => <Matrix {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
