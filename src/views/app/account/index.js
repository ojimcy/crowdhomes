import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "account-profile" */ './Profile')
);
const Referrals = React.lazy(() =>
  import(/* webpackChunkName: "account-team" */ './Referrals.js')
);
const Matrix = React.lazy(() =>
  import(/* webpackChunkName: "account-team" */ './Matrix.js')
);

const Account = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
      <Route
        path={`${match.url}/profile`}
        render={(props) => <Profile {...props} />}
      />
      <Route
        path={`${match.url}/matrix`}
        render={(props) => <Matrix {...props} />}
      />
      <Route
        path={`${match.url}/referrals`}
        render={(props) => <Referrals {...props} />}
      />
      <Route
        path={`${match.url}/how-it-works`}
        render={(props) => <Referrals {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Account;
