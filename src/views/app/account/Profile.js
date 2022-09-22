import React, { useEffect, useState } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Label, Row } from 'reactstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import './profile.css';

const Profile = ({ currentAccount, match }) => {

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.account.profile" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card>
            <div className="position-absolute card-top-buttons">
              <span>{currentAccount.walletAddress}</span>
            </div>
            <CardHeader>
              <p className="h2 mt-3">Profile</p>
            </CardHeader>
            <CardBody>
              <Row>
                <Colxx xxs="12">
                  <Label>Account ID</Label>
                  <p className="info-text">{currentAccount.id}</p>
                </Colxx>
                <Colxx xxs="12">
                  <Label>Upline ID</Label>
                  <p className="info-text">{currentAccount.uplineID>0? currentAccount.uplineID : currentAccount.referralID}</p>
                </Colxx>
                <Colxx xxs="12">
                  <Label>Level</Label>
                  <p className="info-text">{currentAccount.premiumLevel}</p>
                </Colxx>
                <Colxx xxs="12">
                  <Label>Referrals Count</Label>
                  <p className="info-text">{currentAccount.referralsCount}</p>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;

  return {
    currentAccount,
  };
};

export default injectIntl(connect(mapStateToProps, {})(Profile));
