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

      <Row>
        <Colxx xxs="12">
          <Card>
            <div className="position-absolute card-top-buttons">
              <button
                onClick={() => setShowEditProfileModal(true)}
                type="button"
                className="btn btn-outline-primary"
              >
                Edit Profile
              </button>
            </div>
            <CardHeader>
              <p className="h2 mt-3">Account Details</p>
            </CardHeader>
            <CardBody>
              <Row>
                <Colxx xxs="12">
                  <Label>Name</Label>
                  <p className="info-text">
                    {currentUser.last_name} {currentUser.first_name}
                  </p>
                </Colxx>
                <Colxx xxs="12">
                  <Label>Email</Label>
                  <p className="info-text">{currentUser.email}</p>
                </Colxx>
                <Colxx xxs="12">
                  <Label>Phone Number</Label>
                  <p className="info-text">{currentUser.phone_number}</p>
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
  const { currentUser } = authUser;

  return {
    currentUser,
  };
};

export default injectIntl(connect(mapStateToProps, {})(Referrals));
