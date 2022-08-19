/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { formatAmount } from 'helpers/math';

const RecentEarnings = ({ items }) => {
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle>Recent ROI</CardTitle>
        <div className="scroll">
          {items.map((item) => {
            return (
              <div key={item.id} className="d-flex flex-row mb-3">
                <div className="pl-3 pt-2 pr-2 pb-2">
                  <p className="list-item-heading">
                    Percentage gain {item.percentage / 1000}%
                  </p>
                  <div className="pr-4">
                    <p className="text-muted mb-1 text-small">
                      You earned $
                      {formatAmount(
                        (item.percentage / 100000) * item.principal
                      )}{' '}
                      from a ${formatAmount(item.principal)} trading capital
                    </p>
                  </div>
                  <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                    {new Date(item.date * 1000).toDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentEarnings;
