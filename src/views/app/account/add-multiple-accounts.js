import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Label,
  FormGroup,
  CardHeader,
  CardFooter,
  Card,
  CardBody,
  Row,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { refreshUserInfo, updateProfile } from "redux/actions";
import { NotificationManager } from "components/common/react-notifications";
import ConnectWalletModal from "./ConnectWalletModal";

import { useAccount, useProvider, useWaitForTransaction } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { sleep } from "helpers/sleeper";
import { Colxx } from "components/common/CustomBootstrap";

const AddMultipleAccount = ({ currentAccount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [settingUplineID, setSettingUplineID] = useState(false);
  const [number, setNumber] = useState(1);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const submitted = useRef(false);
  const { isConnected, address } = useAccount();

  const initialValues = {
    referralID: currentAccount.id || 1,
    uplineID: currentAccount.id || 1,
    withdrawalAddress: currentAccount.walletAddress || address,
    number: 1,
  };
  return (
    <Row>
      <Colxx md={6}>
        <Card>
          <CardHeader>
            <h6 className="top-callout">Add Multiple Accounts</h6>
          </CardHeader>

          <Formik initialValues={initialValues}>
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <CardBody>
                  <FormGroup className="form-group has-float-label">
                    <Label>Wallet Address</Label>
                    <Field
                      className="form-control"
                      name="withdrawalAddress"
                      required
                    />
                    {errors.withdrawalAddress && touched.withdrawalAddress && (
                      <div className="invalid-feedback d-block">
                        {errors.withdrawalAddress}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label">
                    <Label>Number of Accounts</Label>
                    <Field
                      className="form-control"
                      type="number"
                      name="number"
                      placeholder="Number of Accounts"
                    />
                    {errors.uplineID && touched.uplineID && (
                      <div className="invalid-feedback d-block">
                        {errors.uplineID}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label">
                    <Label>Referral ID</Label>
                    <Field
                      className="form-control"
                      name="referralID"
                      type="text"
                    />
                    {errors.referralID && touched.referralID && (
                      <div className="invalid-feedback d-block">
                        {errors.referralID}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="text-left">
                    <Field
                      custom
                      type="checkbox"
                      id="supported-checkbox"
                      label={"Set Matrix Upline ID"}
                    />
                  </FormGroup>
                  {settingUplineID ? (
                    <Form.Group id="formBasicPassword">
                      <Form.Label>Matrix Upline ID</Form.Label>
                      <Form.Control
                      name
                        value={uplineID}
                        onChange={(el) => setSettingUplineID(el.target.value)}
                        type="text"
                      />
                    </Form.Group>
                  ) : (
                    ""
                  )}
                </CardBody>
                <CardFooter>
                  {isConnected ? (
                    <Button
                      type="submit"
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        isLoading ? "show-spinner" : ""
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Submit</span>
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setShowConnectWalletModal(true);
                        }}
                      >
                        Connect Wallet To Get Started
                      </Button>
                      <ConnectWalletModal
                        showModal={showConnectWalletModal}
                        handleClose={() => setShowConnectWalletModal(false)}
                      />
                    </>
                  )}
                </CardFooter>
              </Form>
            )}
          </Formik>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ appData, authUser }) => {
  const { loading, updateProfileSuccessMessage } = appData;
  const { currentAccount } = authUser;
  return {
    loading,
    updateProfileSuccessMessage,
    currentAccount,
  };
};


export default connect(mapStateToProps, {
  updateProfileAction: updateProfile,
  updateUserInfoAction: refreshUserInfo,
})(AddMultipleAccount);
