/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { formatAmount } from 'helpers/math';

const PriceCard = ({ data, buyPackage }) => {
  return (
    <Card>
      <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
        <div className="price-top-part">
          <i className={`large-icon ${data.icon}`} />
          <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
            {data.name}
          </h5>
          <p className="text-large mb-2 text-default">
            ${formatAmount(data.price)}
          </p>
          <p className="text-muted text-small">{data.detail}</p>
        </div>
        <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
          <ul className="list-unstyled">
            <li>
              <p className="mb-0">
                Monthly ROI: {data.min_return_per_month} -{' '}
                {data.max_return_per_month}%
              </p>
            </li>
            <li>
              <p className="mb-0">Accuracy: {data.accuracy}</p>
            </li>
            <li>
              <p className="mb-0">Trades per day: {data.trades_per_day}</p>
            </li>
          </ul>
          <div className="text-center">
            <Button
              onClick={() => buyPackage(data.id)}
              className="btn btn-link btn-empty btn-lg"
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
