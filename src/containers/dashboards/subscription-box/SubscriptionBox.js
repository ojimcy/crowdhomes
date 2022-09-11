import React, { useEffect } from "react";
import { Row, CardTitle, Card, CardBody, Button } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import PriceCard from "components/cards/PriceCard";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import "./SubscriptionBox.css";
import { getPackages } from "redux/actions";
import { NotificationManager } from "components/common/react-notifications";

const SubscriptionBox = ({ getPackagesAction, packages }) => {
  useEffect(() => {
    getPackagesAction();
  }, [getPackagesAction]);

  const buyPackage = (id) => {
    NotificationManager.error(id, "Error", 5000, null, null, "");
    console.log(id);
  };

  return (
    <>
      <Row className="equal-height-container icon-cards-row mb-5">
        <Colxx xxs="12">
          <CardTitle className="text-center">
            <h1>Available Packages</h1>
          </CardTitle>
        </Colxx>

        <Colxx md="12" lg="4" className="col-item mb-4">
          <Card>
            <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
              <div className="price-top-part">
                <i className={`large-icon star`} />
                <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
                  Gold
                </h5>
                <p className="text-large mb-2 text-default">$100</p>
                {/* <p className="text-muted text-small">{data.detail}</p> */}
              </div>
              <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                <ul className="list-unstyled">
                  <li>
                    <p className="mb-3">Interest Accrued: 40%</p>
                  </li>
                  <li>
                    <p className="mb-3">Maturity Period: 12 Month</p>
                  </li>
                </ul>
                <div className="text-center">
                  <Button
                    onClick={() => buyPackage(data.id)}
                    className="btn btn-link btn-empty btn-lg"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx md="12" lg="4" className="col-item mb-4">
          <Card>
            <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
              <div className="price-top-part">
                <i className={`large-icon star`} />
                <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
                  Silver
                </h5>
                <p className="text-large mb-2 text-default">$100</p>
                {/* <p className="text-muted text-small">{data.detail}</p> */}
              </div>
              <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                <ul className="list-unstyled">
                  <li>
                    <p className="mb-3">Interest Accrued: 15%</p>
                  </li>
                  <li>
                    <p className="mb-3">Maturity Period: 6 Month</p>
                  </li>
                </ul>
                <div className="text-center">
                  <Button
                    onClick={() => buyPackage(data.id)}
                    className="btn btn-link btn-empty btn-lg"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx md="12" lg="4" className="col-item mb-4">
          <Card>
            <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
              <div className="price-top-part">
                <i className={`large-icon star`} />
                <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
                  Diamond
                </h5>
                <p className="text-large mb-2 text-default">$100</p>
                {/* <p className="text-muted text-small">{data.detail}</p> */}
              </div>
              <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                <ul className="list-unstyled">
                  <li>
                    <p className="mb-3">Interest Accrued: 10%</p>
                  </li>
                  <li>
                    <p className="mb-3">Maturity Period: 3 Month</p>
                  </li>
                </ul>
                <div className="text-center">
                  <Button
                    onClick={() => buyPackage(data.id)}
                    className="btn btn-link btn-empty btn-lg"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
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
