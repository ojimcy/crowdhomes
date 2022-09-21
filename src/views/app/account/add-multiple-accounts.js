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
  const [hash, setHash] = useState();
  const [settingUplineID, setSettingUplineID] = useState(false);
  const [number, setNumber] = useState(1);
  const [referralID, setReferralID] = useState("");
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const submitted = useRef(false);
  const { isConnected, address } = useAccount();
  const { premiumContract, systemContract, erc20Contract } = useBlockchain();
  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    confirmations: 1,
    hash,
  });

  const provider = useProvider();

  useEffect(() => {
    window.systemContract = systemContract;
    window.premiumContract = premiumContract;
  }, [systemContract, premiumContract]);

  useEffect(() => {
    if (!isConnected || !erc20Contract) return;
    const fn = async () => {
      window.systemContract = systemContract;
      window.premiumContract = premiumContract;
    };
    fn();
  }, [erc20Contract]);

  useEffect(() => {
    if (txSuccess) {
      setIsLoading(false);
      NotificationManager.warning(
        "Account created. Congratulations",
        "Notice",
        3000,
        null,
        null,
        ""
      );
    }
  }, [txSuccess]);

  useEffect(() => {
    if (txError) {
      setIsLoading(false);
      NotificationManager.warning(txError, "Notice", 3000, null, null, "");
    }
  }, [txError]);

  const register = async (values) => {
    setIsLoading(true);
    submitted.current = true;

    const tx = await premiumContract.register(
      values.referralID,
      values.uplineID,
      values.withdrawalAddress
    );

    console.log(tx.hash);

    let counter = 0;
    while (true) {
      let mintedTx = await provider.getTransaction(tx.hash);
      if (mintedTx) {
        console.log(mintedTx);
        setIsLoading(false);
        break;
      }
      if (counter > 6) {
        console.log("cannot resolve the transaction");
        setIsLoading(false);
        break;
      }
      await sleep(1000);
      counter++;
    }

    NotificationManager.warning(
      "Create account. Congratulations",
      "Notice",
      3000,
      null,
      null,
      ""
    );
  };

  const initialValues = {
    referralID: currentAccount.id || 1,
    uplineID: currentAccount.id || 1,
    withdrawalAddress: currentAccount.walletAddress || address,
  };
  return (
    <Row>
      <Colxx md={6}>
        <Card>
          <CardHeader>
            <h6 className="top-callout">Add Multiple Accounts</h6>
          </CardHeader>

          <Formik initialValues={initialValues} onSubmit={register}>
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
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      type="number"
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
                      onChange={(e) => setSettingUplineID(e.target.value)}
                      type="text"
                      value={referralID}
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
                      value={settingUplineID}
                      onChange={(el) => setSettingUplineID(el.target.checked)}
                      type="checkbox"
                      id="supported-checkbox"
                      label={"Set Matrix Upline ID"}
                    />
                  </FormGroup>
                  {settingUplineID ? (
                    <Form.Group id="formBasicPassword">
                      <Form.Label>Matrix Upline ID</Form.Label>
                      <Form.Control
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
