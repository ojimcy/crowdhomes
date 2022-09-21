import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "account-profile" */ "./Profile")
);
const Referrals = React.lazy(() =>
  import(/* webpackChunkName: "account-team" */ "./Referrals.js")
);
const Matrix = React.lazy(() =>
  import(/* webpackChunkName: "account-matrix" */ "./Matrix.js")
);

const HowItWorks = React.lazy(() =>
  import(/* webpackChunkName: "account-how" */ "./how-it-works.js")
);

const AddMultipleAccounts = React.lazy(() =>
  import(/* webpackChunkName: "account-how" */ "./add-multiple-accounts.js")
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
        render={(props) => <HowItWorks {...props} />}
      />
      <Route
        path={`${match.url}/add-multiple-accounts`}
        render={(props) => <AddMultipleAccounts {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Account;
