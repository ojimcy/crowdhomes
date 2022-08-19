import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from 'containers/navs/Topnav';
import Sidebar from 'containers/navs/Sidebar';
import Footer from 'containers/navs/Footer';
import { NotificationManager } from 'components/common/react-notifications';

const AppLayout = ({ containerClassnames, children, history, error }) => {
  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Error', 3000, null, null, '');
    }
  }, [error]);

  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <Sidebar />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = ({ menu, appData }) => {
  const { containerClassnames } = menu;
  const { error } = appData;

  return { containerClassnames, error };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
