import React, { useEffect } from 'react';
import { Row, CardTitle } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import PriceCard from 'components/cards/PriceCard';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import './SubscriptionBox.css';
import { getPackages } from 'redux/actions';
import { NotificationManager } from 'components/common/react-notifications';

const SubscriptionBox = ({ getPackagesAction, packages }) => {
  useEffect(() => {
    getPackagesAction();
  }, [getPackagesAction]);

  const buyPackage = (id) => {
    NotificationManager.error(id, 'Error', 5000, null, null, '');
    console.log(id);
  };

  return (
    <>
      <Row className="equal-height-container icon-cards-row mb-5">
        <Colxx xxs="12">
          <CardTitle>Subscribe to a package</CardTitle>
        </Colxx>
        {packages.map((item) => {
          return (
            <Colxx
              md="12"
              lg="4"
              className="col-item mb-4"
              key={`priceCard_${item.id}`}
            >
              <PriceCard data={item} buyPackage={buyPackage} />
            </Colxx>
          );
        })}
      </Row>
    </>
  );
};

const mapStateToProps = ({ appData, authUser }) => {
  const { packages } = appData;
  const { currentUser } = authUser;
  return {
    packages,
    currentUser,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getPackagesAction: getPackages,
  })(SubscriptionBox)
);
