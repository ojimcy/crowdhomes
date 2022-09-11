/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
// import gold from '../../../public/assets/img/cards/gold1.png'

const PriceCard = ({ data, buyPackage }) => {
  return (
    <Card>
      <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
        <div className="price-top-part">
          {/* <i className={`large-icon ${data.icon}`} /> */}
          <img src='{gold}' alt="gold" />
          <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
            Diamond
          </h5>
          <p className="text-large mb-2 text-default">
            $100
          </p>
        </div>
        <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
          <ul className="list-unstyled">
            <li>
              <p className="mb-0">
              Interest Accrued: 10%
              </p>
            </li>
            <li>
              <p className="mb-0">Maturity Period: 6 Month</p>
            </li>
          </ul>
          <div className="text-center">
            <Button
              onClick={() => buyPackage(data.id)}
              className="btn btn-link btn-empty btn-sm"
            >
              Subscribe <i className="simple-icon-arrow-right" />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default React.memo(PriceCard);
