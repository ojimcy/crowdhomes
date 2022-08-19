import React from 'react';
import { Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { Colxx } from 'components/common/CustomBootstrap';
import './AccountBalance.css';
import { formatAmount } from 'helpers/math';
import { NavLink } from 'react-router-dom';

const AccountBalance = ({ currentUser }) => {
  return (
    <Row className="mb-5">
      <Colxx xxs="8">
        <p className="balance-lable">
          Available Balance: $<span>{formatAmount(currentUser.balance)}</span>
        </p>
      </Colxx>
      <Colxx xxs="4">
        <NavLink to="wallet/deposits" className="btn btn-primary float-right">
          Deposit
        </NavLink>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return {
    currentUser,
  };
};
export default injectIntl(connect(mapStateToProps, {})(AccountBalance));
