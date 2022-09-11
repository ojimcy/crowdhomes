import React, { useState } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Label, Row } from 'reactstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import './profile.css';
import EditProfileModal from 'containers/account/EditProfiltModal';

const Profile = ({ currentUser, match }) => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

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
              <span>ConnectedWallet</span>
            </div>
            <EditProfileModal
              currentUser={currentUser}
              showModal={showEditProfileModal}
              handleClose={() => setShowEditProfileModal(false)}
            />
            <CardHeader>
              <p className="h2 mt-3">Profile</p>
            </CardHeader>
            <CardBody>
              <Row>
                <Colxx xxs="12">
                  <Label>Package</Label>
                  <p className="info-text">
                    Gold
                  </p>
                </Colxx>
                <Colxx xxs="12">
                  <Label>Account ID</Label>
                  <p className="info-text">1</p>
                </Colxx>
                <Colxx xxs="12">
                  <Label>Referral ID</Label>
                  <p className="info-text">0</p>
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

export default injectIntl(connect(mapStateToProps, {})(Profile));
