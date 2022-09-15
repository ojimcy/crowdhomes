import React, { useState } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Label, Row } from 'reactstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import './profile.css';

const Referrals = ({ currentUser, match }) => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.account.referrals" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;

  return {
    currentUser,
  };
};

export default injectIntl(connect(mapStateToProps, {})(Referrals));
