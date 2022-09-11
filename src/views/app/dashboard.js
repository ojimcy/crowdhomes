import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import SubscriptionBox from 'containers/dashboards/subscription-box/SubscriptionBox';
import {
  getActiveSubscription,
  getMyReferralCount,
  getRecentEarnings,
} from 'redux/app/actions';
import ActiveSubscription from 'containers/dashboards/subscription-box/ActiveSubscription';
import { formatAmount } from 'helpers/math';
import RecentEarnings from 'containers/dashboards/RecentEarnings';

const Dashboard = ({
  match,
  currentUser,
  noActiveSubscription,
  activeSubscription,
  getActiveSubscriptionAction,
  myReferralCount,
  getMyReferralCountAction,
  recentEarnings,
  getRecentEarningsAction,
}) => {
  useEffect(() => {
    getActiveSubscriptionAction();
    getMyReferralCountAction();
    getRecentEarningsAction();
  }, [
    getActiveSubscriptionAction,
    getMyReferralCountAction,
    getRecentEarningsAction,
  ]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.dashboard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {activeSubscription ? (
          <>
            <Colxx xxs="12" md="6">
              <ActiveSubscription data={activeSubscription} />
            </Colxx>

            <Colxx xxs="12" md="6">
              <Row className="icon-cards-row">
                <Colxx md="6" xxs="12">
                  <div className="icon-row-item mb-4">
                    <Card>
                      <CardBody className="text-center">
                        <i className="simple-icon-diamond" />
                        <p className="card-text font-weight-semibold mb-0">
                          Trading Capital
                        </p>
                        <p className="lead text-center">
                          ${formatAmount(currentUser.principal)}
                        </p>
                        <p className="text-center">
                          <Button>Topup</Button>
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                </Colxx>

                <Colxx md="6" xxs="12">
                  <div className="icon-row-item mb-4">
                    <Card>
                      <CardBody className="text-center">
                        <i className="iconsminds-mens" />
                        <p className="card-text font-weight-semibold mb-0">
                          Total Referral
                        </p>
                        <p className="lead text-center">{myReferralCount}</p>
                        <p className="text-center mt-3">Leaderboard: Teir 1</p>
                      </CardBody>
                    </Card>
                  </div>
                </Colxx>

                <Colxx md="12">
                  {recentEarnings ? (
                    <RecentEarnings items={recentEarnings} />
                  ) : (
                    ''
                  )}
                </Colxx>
              </Row>
            </Colxx>
          </>
        ) : (
          ''
        )}
      </Row>

      {noActiveSubscription ? <SubscriptionBox /> : ''}
    </>
  );
};

const mapStateToProps = ({ appData, authUser }) => {
  const {
    activeSubscription,
    noActiveSubscription,
    myReferralCount,
    recentEarnings,
  } = appData;
  const { currentUser } = authUser;
  return {
    activeSubscription,
    noActiveSubscription,
    currentUser,
    myReferralCount,
    recentEarnings,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getActiveSubscriptionAction: getActiveSubscription,
    getMyReferralCountAction: getMyReferralCount,
    getRecentEarningsAction: getRecentEarnings,
  })(Dashboard)
);
