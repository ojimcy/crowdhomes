import React from 'react';
import { Row, Card, CardBody, Jumbotron } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { formatUnixDate } from 'helpers/math';

const ActiveSubscription = ({ data }) => {
  // eslint-disable-next-line react/destructuring-assignment
  const pkg = data.package;
  return (
    <>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <Jumbotron>
                <h1 className="display-4">Hello, Your Majesty</h1>
                <p className="lead">
                  You are subscribed to the {pkg.name} package
                </p>
                <hr className="my-4" />
                <p>
                  As an <em>{pkg.name}</em> package subscriber, you will be
                  earning {pkg.min_return_per_month} -{' '}
                  {pkg.max_return_per_month}% per month and your bot will be
                  taking {pkg.trades_per_day} calculated trade per day with an
                  accuracy of {pkg.accuracy}%
                </p>
                <ul>
                  <li>
                    Subscription Start Date: {formatUnixDate(data.start_date)}
                  </li>
                  <li>
                    Subscription End Date: {formatUnixDate(data.end_date)}
                  </li>
                </ul>
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default ActiveSubscription;
